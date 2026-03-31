/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/

;// external ["wp","blocks"]
const external_wp_blocks_namespaceObject = window["wp"]["blocks"];
;// ./plugin/blocks/events/block.json
const block_namespaceObject = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"web-event-filter/events","version":"0.1.0","title":"Events","category":"web-react-frontend-filter","icon":"tickets-alt","editorScript":"web-react-frontend-filter--register-blocks","viewScript":"web-react-frontend-filter--init-react","supports":{"html":false},"attributes":{"appId":{"type":"string"},"postsPerPage":{"type":"number","default":10}}}');
;// external "React"
const external_React_namespaceObject = window["React"];
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_namespaceObject);
;// external ["wp","blockEditor"]
const external_wp_blockEditor_namespaceObject = window["wp"]["blockEditor"];
;// external ["wp","components"]
const external_wp_components_namespaceObject = window["wp"]["components"];
;// external ["wp","i18n"]
const external_wp_i18n_namespaceObject = window["wp"]["i18n"];
;// ./plugin/blocks/events/edit.js


/**
 * WordPress dependencies.
 */



function Edit({
  attributes,
  setAttributes
}) {
  const {
    appId,
    postsPerPage
  } = attributes;
  return /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement(external_wp_blockEditor_namespaceObject.InspectorControls, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Settings')
  }, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    type: "number",
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Posts per page'),
    value: postsPerPage ? Math.max(-1, postsPerPage) : 10,
    onChange: value => setAttributes({
      postsPerPage: value
    })
  }))), /*#__PURE__*/external_React_default().createElement(external_wp_blockEditor_namespaceObject.InspectorAdvancedControls, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('App-ID'),
    value: appId || '',
    onChange: value => setAttributes({
      appId: value
    })
  })), /*#__PURE__*/external_React_default().createElement("div", (0,external_wp_blockEditor_namespaceObject.useBlockProps)(), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Card, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.CardHeader, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Flex, {
    align: "center",
    justify: "center",
    wrap: true,
    gap: "1em"
  }, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.FlexItem, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Icon, {
    icon: "tickets-alt"
  })), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.FlexItem, null, /*#__PURE__*/external_React_default().createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Events")))), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.CardBody, null, appId && /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('App-ID'),
    value: appId || '',
    onChange: value => setAttributes({
      appId: value
    })
  }), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    type: "number",
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Posts per page'),
    value: postsPerPage ? Math.max(-1, postsPerPage) : 10,
    onChange: value => setAttributes({
      postsPerPage: Math.max(-1, value)
    })
  })))));
}
;// ./plugin/blocks/events/save.js



function save({
  attributes
}) {
  const {
    appId,
    ...componentProps
  } = attributes;
  return /*#__PURE__*/external_React_default().createElement("section", external_wp_blockEditor_namespaceObject.useBlockProps.save({
    className: 'web-react--app',
    ...(appId ? {
      'data-app-id': appId
    } : {}),
    'data-init-props': JSON.stringify(componentProps)
  }));
}
;// ./plugin/blocks/events/index.js
/**
 * A dynamic block for the Gutenberg editor. The edit.js file is used to
 * define the editor interface of the block. The rendering of the
 * frontend component happens in PHP.
 */

/**
 * WordPress dependencies
 */


/**
 * The block metadata.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/
 */


/**
 * The block edit function.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */


const settings = {
  edit: Edit,
  save: save
};

/**
 * Actually register the block.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/
 */
(0,external_wp_blocks_namespaceObject.registerBlockType)(block_namespaceObject, settings);
;// ./plugin/blocks/filter/block.json
const filter_block_namespaceObject = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"web-event-filter/filter","version":"0.1.0","title":"Filter","category":"web-react-frontend-filter","icon":"filter","editorScript":"web-react-frontend-filter--register-blocks","viewScript":"web-react-frontend-filter--init-react","supports":{"html":false},"attributes":{"appId":{"type":"string"},"label":{"type":"string"},"metaKey":{"type":"string"}}}');
;// ./plugin/blocks/filter/edit.js


/**
 * WordPress dependencies.
 */



function edit_Edit({
  attributes,
  setAttributes
}) {
  const {
    appId,
    metaKey,
    label
  } = attributes;
  return /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement(external_wp_blockEditor_namespaceObject.InspectorControls, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Settings')
  }, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Label'),
    value: label || '',
    onChange: value => setAttributes({
      label: value
    })
  }), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Meta-Key'),
    value: metaKey || '',
    onChange: value => setAttributes({
      metaKey: value
    })
  }))), /*#__PURE__*/external_React_default().createElement(external_wp_blockEditor_namespaceObject.InspectorAdvancedControls, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('App-ID'),
    value: appId || '',
    onChange: value => setAttributes({
      appId: value
    })
  })), /*#__PURE__*/external_React_default().createElement("div", (0,external_wp_blockEditor_namespaceObject.useBlockProps)(), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Card, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.CardHeader, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Flex, {
    align: "center",
    justify: "center",
    wrap: true,
    gap: "1em"
  }, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.FlexItem, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Icon, {
    icon: "filter"
  })), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.FlexItem, null, /*#__PURE__*/external_React_default().createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Filter")))), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.CardBody, null, appId && /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('App-ID'),
    value: appId || '',
    onChange: value => setAttributes({
      appId: value
    })
  }), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Label'),
    value: label || '',
    onChange: value => setAttributes({
      label: value
    })
  }), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Meta-Key'),
    value: metaKey || '',
    onChange: value => setAttributes({
      metaKey: value
    })
  })))));
}
;// ./plugin/blocks/filter/save.js



function save_save({
  attributes
}) {
  const {
    appId,
    ...componentProps
  } = attributes;
  return /*#__PURE__*/external_React_default().createElement("div", external_wp_blockEditor_namespaceObject.useBlockProps.save({
    className: 'web-react--portal',
    ...(appId ? {
      'data-app-id': appId
    } : {}),
    'data-component-name': 'checkbox-filter',
    'data-init-props': JSON.stringify(componentProps)
  }));
}
;// ./plugin/blocks/filter/index.js
/**
 * A dynamic block for the Gutenberg editor. The edit.js file is used to
 * define the editor interface of the block. The rendering of the
 * frontend component happens in PHP.
 */

/**
 * WordPress dependencies
 */


/**
 * The block metadata.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/
 */


/**
 * The block edit function.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */


const filter_settings = {
  edit: edit_Edit,
  save: save_save
};

/**
 * Actually register the block.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/
 */
(0,external_wp_blocks_namespaceObject.registerBlockType)(filter_block_namespaceObject, filter_settings);
;// ./plugin/blocks/calendar/block.json
const calendar_block_namespaceObject = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"web-event-filter/calendar","version":"0.1.0","title":"Calendar","category":"web-react-frontend-filter","icon":"calendar-alt","editorScript":"web-react-frontend-filter--register-blocks","viewScript":"web-react-frontend-filter--init-react","supports":{"html":false},"attributes":{"appId":{"type":"string"},"showDaysOutsideCurrentMonth":{"type":"boolean","default":true}}}');
;// ./plugin/blocks/calendar/edit.js


/**
 * WordPress dependencies.
 */



function calendar_edit_Edit({
  attributes,
  setAttributes
}) {
  const {
    appId,
    showDaysOutsideCurrentMonth
  } = attributes;
  return /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement(external_wp_blockEditor_namespaceObject.InspectorControls, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('Settings')
  }, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.ToggleControl, {
    __nextHasNoMarginBottom: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Show days outside current month'),
    checked: showDaysOutsideCurrentMonth,
    onChange: () => setAttributes({
      showDaysOutsideCurrentMonth: !showDaysOutsideCurrentMonth
    })
  }))), /*#__PURE__*/external_React_default().createElement(external_wp_blockEditor_namespaceObject.InspectorAdvancedControls, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('App-ID'),
    value: appId || '',
    onChange: value => setAttributes({
      appId: value
    })
  })), /*#__PURE__*/external_React_default().createElement("div", (0,external_wp_blockEditor_namespaceObject.useBlockProps)(), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Card, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.CardHeader, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Flex, {
    align: "center",
    justify: "center",
    wrap: true,
    gap: "1em"
  }, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.FlexItem, null, /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.Icon, {
    icon: "calendar-alt"
  })), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.FlexItem, null, /*#__PURE__*/external_React_default().createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Calendar")))), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.CardBody, null, appId && /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.TextControl, {
    __next40pxDefaultSize: true,
    label: (0,external_wp_i18n_namespaceObject.__)('App-ID'),
    value: appId || '',
    onChange: value => setAttributes({
      appId: value
    })
  }), /*#__PURE__*/external_React_default().createElement(external_wp_components_namespaceObject.ToggleControl, {
    __nextHasNoMarginBottom: true,
    label: (0,external_wp_i18n_namespaceObject.__)('Show days outside current month'),
    checked: showDaysOutsideCurrentMonth,
    onChange: () => setAttributes({
      showDaysOutsideCurrentMonth: !showDaysOutsideCurrentMonth
    })
  })))));
}
;// ./plugin/blocks/calendar/save.js



function calendar_save_save({
  attributes
}) {
  const {
    appId,
    ...componentProps
  } = attributes;
  return /*#__PURE__*/external_React_default().createElement("div", external_wp_blockEditor_namespaceObject.useBlockProps.save({
    className: 'web-react--portal',
    ...(appId ? {
      'data-app-id': appId
    } : {}),
    'data-component-name': 'calendar-filter',
    'data-init-props': JSON.stringify(componentProps)
  }));
}
;// ./plugin/blocks/calendar/index.js
/**
 * A dynamic block for the Gutenberg editor. The edit.js file is used to
 * define the editor interface of the block. The rendering of the
 * frontend component happens in PHP.
 */

/**
 * WordPress dependencies
 */


/**
 * The block metadata.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/
 */


/**
 * The block edit function.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */


const calendar_settings = {
  edit: calendar_edit_Edit,
  save: calendar_save_save
};

/**
 * Actually register the block.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/
 */
(0,external_wp_blocks_namespaceObject.registerBlockType)(calendar_block_namespaceObject, calendar_settings);
;// ./plugin/admin/src/js/register-blocks.js



/******/ })()
;