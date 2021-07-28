// Still WIP 
// But basically using a resource of Bootstrap Tree View (https://github.com/jonmiles/bootstrap-treeview)
// to sort and filter through a couple of elements based on their properties, which are in a DB.
// The data is parsed via a PHP file (get-data.php) accessing the data from the DB and formating them into a JSON, 
// which is then gotten from the AJAX call. 

$(function() {
	window.onload = function(e) {
		// doAjax()
		// 	.then(data => initExpandibleTree2(data))
		// 	.then(() => getAllNodes());
	};

	function errorHandler(jqXHR, exception) {
		if (jqXHR.status === 0) {
			alert('Not connect.\n Verify Network.');
		} else if (jqXHR.status == 404) {
			alert('Requested page not found. [404]');
		} else if (jqXHR.status == 500) {
			alert('Internal Server Error [500].');
		} else if (exception === 'parsererror') {
			alert('Requested JSON parse failed.');
		} else if (exception === 'timeout') {
			alert('Time out error.');
		} else if (exception === 'abort') {
			alert('Ajax request aborted.');
		} else {
			alert('Uncaught Error.\n' + jqXHR.responseText);
		}
	}

	var initExpandibleTree2 = function(changedData) {
		return $('#treeview-expandible').treeview({
			data: changedData,
			showCheckbox: true,
			showTags: false,
			expandIcon: 'glyphicon glyphicon-chevron-right',
			collapseIcon: 'glyphicon glyphicon-chevron-down',
			levels: 1,
			color: '#103F8F',
			// selectedColor: '#103F8F',
			// selectedBackColor: '#F9C711',
			highlightSearchResults: false,
			multiSelect: true,

			onNodeExpanded: function(event, node) {
				let nodeCategoryId =
					node.databaseId.replace('category-', '') - 1;

				allNodes[nodeCategoryId].expanded = true;
			},

			onNodeCollapsed: function(event, node) {
				let nodeCategoryId =
					node.databaseId.replace('category-', '') - 1;

				allNodes[nodeCategoryId].expanded = false;
			},

			onNodeChecked: function(event, node) {
				let parent = $('#treeview-expandible').treeview(
					'getParent',
					node
				);

				if (parent.selector == null) {
					let indexParentId =
						parent.databaseId.replace('category-', '') - 1;

					var allSiblings = $('#treeview-expandible').treeview(
						'getSiblings',
						node
					);

					let siblingsChecked = true;

					if (allSiblings != undefined) {
						allSiblings.forEach(sibling => {
							console.log(sibling);
							if (sibling.state.checked == false) {
								siblingsChecked = false;
							}
						});

						if (siblingsChecked == true) {
							$('#treeview-expandible').treeview('checkNode', [
								parent.nodeId,
								{ silent: true, ignoreChildren: true }
							]);
						}
					}

					let child = new Object();
					child.elementId = node.databaseId.replace('element-', '');
					child.tags = node.tags;

					let alreadyInUse = true;

					if (allNodes[indexParentId].nodes.length != 0) {
						allNodes[indexParentId].nodes.some(kid => {
							if (kid.elementId == child.elementId) {
								kid.checked = node.state.checked ? true : false;
								alreadyInUse = false;
								return false;
							}
						});
						if (alreadyInUse) {
							child.checked = node.state.checked ? true : false;
							allNodes[indexParentId].nodes.push(child);
						}
					} else {
						child.checked = node.state.checked ? true : false;
						allNodes[indexParentId].nodes.push(child);
					}
				}

				updateChosenElementsHTML(allNodes);
			},

			onNodeUnchecked: function(event, node) {
				let parent = $('#treeview-expandible').treeview(
					'getParent',
					node
				);

				if (parent.selector == null) {
					if (parent.state.checked == true) {
						$('#treeview-expandible').treeview('uncheckNode', [
							parent.nodeId,
							{ silent: true, ignoreChildren: true }
						]);
					}
					let indexParentId =
						parent.databaseId.replace('category-', '') - 1;

					let child = new Object();
					child.elementId = node.databaseId.replace('element-', '');

					allNodes[indexParentId].nodes.some(kid => {
						if (kid.elementId == child.elementId) {
							kid.checked = node.state.checked ? true : false;
							return false;
						}
					});
				}

				updateChosenElementsHTML(allNodes);
			}
		});
	};

	var newData;

	function getNumberCheckedElements(allNodes) {
		let countCheckedElements = 0;
		allNodes.forEach(category => {
			if (
				category.nodes.length != 0 &&
				category.nodes.find(function(element) {
					return element.checked == true;
				})
			) {
				category.nodes.forEach(element => {
					if (element.checked) {
						countCheckedElements++;
					}
				});
			}
		});

		return countCheckedElements;
	}

	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	function updateChosenElementsHTML(allNodes) {
		console.group('All Nodes: ');
		console.log(allNodes);
		console.groupEnd();

		let countCheckedElements = getNumberCheckedElements(allNodes);
		let textCountCheckedElements = ' (' + countCheckedElements + ')';

		var checkedElementsHeadingHTML = document.createElement('h3');
		checkedElementsHeadingHTML.id = 'checkedElementsHeading';
		checkedElementsHeadingHTML.innerText =
			'Vybrané prvky' + textCountCheckedElements;

		var checkedElementsDownloadButton = document.createElement('button');
		checkedElementsDownloadButton.id = 'downloadChosen';
		checkedElementsDownloadButton.className = 'btn btn-primary pull-right';
		checkedElementsDownloadButton.type = 'button';
		checkedElementsDownloadButton.title =
			'Začne stahovat vybrané prvky do archivu ZIP';
		checkedElementsDownloadButton.innerText = 'Stáhnout v ZIP!';

		if (countCheckedElements == 0) {
			document.querySelector('#downloadChosen').disabled = true;
			document.querySelector('#resetChosenBtn').disabled = true;
		} else {
			document.querySelector('#resetChosenBtn').disabled = false;
		}

		// checkedElementsHeadingHTML.appendChild(checkedElementsDownloadButton);

		document
			.querySelector('#checkedElementsHeading')
			.replaceWith(checkedElementsHeadingHTML);

		var checkedElementsLinkHTML = document.createElement('a');
		checkedElementsLinkHTML.id = 'checkedElementsDownloadLink';
		checkedElementsLinkHTML.href = '#downloadChosen';
		checkedElementsLinkHTML.title = 'Stáhnout jen vybrané prvky (ZIP)';
		checkedElementsLinkHTML.innerText =
			'STÁHNOUT VYBRANÉ' + textCountCheckedElements;

		$('#checkedElementsDownloadLink').replaceWith(checkedElementsLinkHTML);

		var checkedElementsHTML = document.createElement('div');
		checkedElementsHTML.id = 'checkedElements';

		allNodes.forEach(category => {
			if (
				category.nodes.length != 0 &&
				category.nodes.find(function(element) {
					return element.checked == true;
				})
			) {
				document.querySelector('#downloadChosen').disabled = false;
				console.log('Juhhuuu! ' + category.categoryText);

				let panelHTML = document.createElement('div');
				panelHTML.className = 'panel panel-default';

				let panelHeadingHTML = document.createElement('div');
				panelHeadingHTML.className = 'panel-heading';

				let panelTitleHTML = document.createElement('h3');
				panelTitleHTML.className = 'panel-title';
				panelTitleHTML.innerText = category.categoryText;

				let panelParagraphHTML = document.createElement('p');
				panelParagraphHTML.style = 'margin-top: 5px; margin-bottom:0;';

				let tagLabelMaterial = document.createElement('li');
				tagLabelMaterial.className = 'label label-info';
				tagLabelMaterial.innerText =
					category.tags[1].capitalize() + 'ové';

				panelParagraphHTML.appendChild(tagLabelMaterial);
				panelParagraphHTML.append(' ');

				let tagLabelType = document.createElement('li');
				tagLabelType.className = 'label label-default';
				tagLabelType.innerText = category.tags[0];

				panelParagraphHTML.appendChild(tagLabelType);
				panelParagraphHTML.append(' ');

				let tagLabelDepth = document.createElement('li');
				tagLabelDepth.className = 'label label-warning';
				tagLabelDepth.innerText = category.tags[2] + ' mm';

				panelParagraphHTML.appendChild(tagLabelDepth);

				panelHeadingHTML.appendChild(panelTitleHTML);
				panelHeadingHTML.appendChild(panelParagraphHTML);

				let elementList = document.createElement('ul');
				elementList.className = 'list-group';

				category.nodes.forEach(element => {
					if (element.checked) {
						let elementItem = document.createElement('li');
						elementItem.className = 'list-group-item';

						let itemParagraphHTML = document.createElement('p');
						itemParagraphHTML.style =
							'margin-top: 5px; margin-bottom:0;';

						let textSashCount;

						switch (Number(element.tags[1])) {
							case 1:
								textSashCount = element.tags[1] + ' křídlo';
								break;
							case 5:
							case 6:
								textSashCount = element.tags[1] + ' křídel';
								break;
							default:
								textSashCount = element.tags[1] + ' křídla';
								break;
						}

						let tagLabelSashCountElement = document.createElement(
							'li'
						);
						tagLabelSashCountElement.className =
							'label label-primary';
						tagLabelSashCountElement.innerText = textSashCount;

						itemParagraphHTML.appendChild(tagLabelSashCountElement);
						itemParagraphHTML.append(' s rozložením: ');

						let tagLabelSashStructureElement = document.createElement(
							'li'
						);
						tagLabelSashStructureElement.className =
							'label label-danger';
						tagLabelSashStructureElement.innerText =
							element.tags[3];

						itemParagraphHTML.appendChild(
							tagLabelSashStructureElement
						);

						if (element.tags[4]) {
							itemParagraphHTML.append(' | ');
							let tagLabelCornerElement = document.createElement(
								'li'
							);
							tagLabelCornerElement.className =
								'label label-success';
							tagLabelCornerElement.innerText = element.tags[4].capitalize();

							itemParagraphHTML.appendChild(
								tagLabelCornerElement
							);
						}

						elementItem.appendChild(itemParagraphHTML);

						elementList.appendChild(elementItem);
					}
				});

				panelHTML.appendChild(panelHeadingHTML);
				panelHTML.appendChild(elementList);

				console.log(panelHTML);

				checkedElementsHTML.append(panelHTML);
			}
		});

		$('#checkedElements').replaceWith(checkedElementsHTML);
	}

	var allNodes = [];

	async function loadData() {
		$.ajax({
			type: 'GET',
			url: 'get-data.php',
			success: function(d) {
				newData = d;
			},
			error: errorHandler
		});
	}

	async function doAjax(args) {
		let result;

		try {
			result = await $.ajax({
				url: 'get-data.php',
				type: 'POST'
			});

			return result;
		} catch (error) {
			console.error(error);
		}
	}

	function getAllNodes() {
		var parentIDNodes = new Array(
			$('#treeview-expandible').treeview('getNode', 0)
		);
		var parentIDNodes = parentIDNodes.concat(
			$('#treeview-expandible').treeview('getSiblings', 0)
		);

		parentIDNodes.map(function(parent) {
			allNodes.push({
				categoryId: parent.databaseId[9],
				categoryText: parent.text.substring(
					0,
					parent.text.lastIndexOf('<span class="s')
				),
				tags: parent.tags,
				nodes: []
			});
		});
	}

	function objectifyForm(formArray) {
		//serialize data function

		var returnArray = {};
		for (var i = 0; i < formArray.length; i++) {
			returnArray[formArray[i]['name']] = formArray[i]['value'];
		}
		return returnArray;
	}

	function checkDisableAllFilter(elementID, value) {
		document.querySelector(elementID).checked = value;
		document.querySelector(elementID).disabled = value;
	}

	function handleInputFilters(variable) {
		let allFilterID = '#all_' + variable;
		let inputFilterClass = variable + 'InputFilter';

		var inputFilterHTMLs = document.getElementsByClassName(
			inputFilterClass
		);
		var inputAllFilterHTML = document.querySelector(allFilterID);

		var inputFilterElements = Array.from(inputFilterHTMLs);

		if (inputAllFilterHTML.checked == true) {
			checkDisableAllFilter(allFilterID, false);
		} else {
			let childsChecked = 0;
			inputFilterElements.forEach(element => {
				if (element.checked == true) {
					childsChecked++;
				}
			});
			if (childsChecked == 0) {
				checkDisableAllFilter(allFilterID, true);
				document.querySelector('#resetFilterBtn').disabled = true;
				checkInputArray(inputFilterElements);
			} else if (childsChecked == inputFilterElements.length) {
				checkDisableAllFilter(allFilterID, true);
				document.querySelector('#resetFilterBtn').disabled = true;
			}
		}
	}

	function checkInputArray(inputFilterElements) {
		inputFilterElements.forEach(element => {
			element.checked = true;
		});
	}

	function handleAllInputFilters(variable) {
		let allFilterID = '#all_' + variable;
		let inputFilterClass = variable + 'InputFilter';

		var inputFilterHTMLs = document.getElementsByClassName(
			inputFilterClass
		);
		var inputAllFilterHTML = document.querySelector(allFilterID);

		var inputFilterElements = Array.from(inputFilterHTMLs);

		checkInputArray(inputFilterElements);

		inputAllFilterHTML.disabled = true;
		document.querySelector('#resetFilterBtn').disabled = true;
		if (inputAllFilterHTML.checked != true) {
			inputFilterElements.forEach(element => {
				if (element.checked == true) {
					element.checked = false;
				} else {
					element.checked = true;
				}
			});
		}
	}

	$('.typeInputFilter').change(function(e) {
		handleInputFilters('type');
	});

	$('.typeAllInputFilter').change(function(e) {
		handleAllInputFilters('type');
	});

	$('.sashInputFilter').change(function(e) {
		handleInputFilters('sash');
	});

	$('.sashAllInputFilter').change(function(e) {
		handleAllInputFilters('sash');
	});

	$('.depthInputFilter').change(function(e) {
		handleInputFilters('depth');
	});

	$('.depthAllInputFilter').change(function(e) {
		handleAllInputFilters('depth');
	});

	$('#resetFilterBtn').click(function(e) {
		e.preventDefault();

		let allFilterIDType = '#all_type';

		let inputFilterClassType = 'typeInputFilter';
		var inputFilterHTMLsType = document.getElementsByClassName(
			inputFilterClassType
		);

		var inputFilterElementsType = Array.from(inputFilterHTMLsType);

		checkInputArray(inputFilterElementsType);
		checkDisableAllFilter(allFilterIDType, true);

		let allFilterIDSash = '#all_sash';

		let inputFilterClassSash = 'sashInputFilter';
		var inputFilterHTMLsSash = document.getElementsByClassName(
			inputFilterClassSash
		);

		var inputFilterElementsSash = Array.from(inputFilterHTMLsSash);

		checkInputArray(inputFilterElementsSash);
		checkDisableAllFilter(allFilterIDSash, true);

		let allFilterIDDepth = '#all_depth';

		let inputFilterClassDepth = 'depthInputFilter';
		var inputFilterHTMLsDepth = document.getElementsByClassName(
			inputFilterClassDepth
		);

		var inputFilterElementsDepth = Array.from(inputFilterHTMLsDepth);

		checkInputArray(inputFilterElementsDepth);
		checkDisableAllFilter(allFilterIDDepth, true);

		// Create a new 'change' event
		var event = new Event('change');

		// Dispatch it.
		document.querySelector('.BIMInputFilter').dispatchEvent(event);

		document.querySelector('#resetFilterBtn').disabled = true;
	});

	$('#resetChosenBtn').click(function(e) {
		e.preventDefault();

		$('#treeview-expandible').treeview('uncheckAll', { silent: false });

		document.querySelector('#resetChosenBtn').disabled = true;
	});

	//Ajax code

	$('.BIMInputFilter').change(function(e) {
		// stop form submission first
		// e.preventDefault();

		if (document.querySelector('#' + e.target.id).checked == false) {
			document.querySelector('#resetFilterBtn').disabled = false;
		}

		// GET VALUE OF APPID
		var appid = $('#filterBIM').val();
		var filterOfBIM = $('form').serialize();

		// GET JSON FROM PHP SCRIPT
		/* $.ajax({
			type: 'POST',
			url: 'get-data.php',
			data: {
				filterOfBIM: filterOfBIM,
				treeData: allNodes
			},
			success: function(d) {
				newData = d;
				var $expandibleTree2 = initExpandibleTree2(newData);

				var serializedJQuery = $('form').serializeArray();
				var serializedJS = objectifyForm(serializedJQuery);
			},
			error: errorHandler
		}); */
	});
});
