scaleFactor = 1.1;

function scaleFactorUp() {
    scaleFactor = 1.2;
}

function scaleFactorDown() {
    scaleFactor = 0.8;
}

function onNode(state) {
    state.__sphere.scale.x *= scaleFactor;
    state.__sphere.scale.y *= scaleFactor;
    state.__sphere.scale.z *= scaleFactor;
}

function graphSet_jsonFileLoad(astr_jsonFileName) {
    // Simply return a graph set read from a json file

    return (function(Graph) {
        Graph
            .onNodeClick(onNode)
            .valField(1)
            .nodeResolution(40)
            .nodeRelSize(10)
            .cooldownTicks(Infinity)
            .nameField('id')
            .autoColorBy('group')
            .forceEngine('ngraph')
            .jsonUrl(astr_jsonFileName);
    })
}

function getGraphDataSets() {

    let l_graph = [
        'eniac',
        'chain',
        'tty',
        'vdu',
        'mainframe-disconnect',
        'mainframe-net',
        'pc',
        'pcs',
        'pcss',
        'pcs-net',
        'pcss-net',
        'cloud',
        'edge',
        'fog',
        'chris',
        'miserables'
    ];

    let l_graphFunction = [];

    for (i in l_graph) {
        console.log(i);
        const funcObj = graphSet_jsonFileLoad(l_graph[i] + '.json');
        funcObj.description = "<em>" + l_graph[i] + "</em> topology";
        funcObj.uid = l_graph[i];
        l_graphFunction.push(funcObj);
    }

    // const loadBlocks = function(Graph) {
    //     qwest.get('blocks.json').then((_, data) => {
    //         data.nodes.forEach(node => { node.name = `${node.user?node.user+': ':''}${node.description || node.id}` });

    //         Graph
    //             .cooldownTicks(300)
    //             .cooldownTime(20000)
    //             .autoColorBy('user')
    //             .forceEngine('ngraph')
    //             .graphData(data);
    //     });
    // };
    // loadBlocks.description = "<em>Blocks</em> data (<a href='https://bl.ocks.org/mbostock/afecf1ce04644ad9036ca146d2084895'>afecf1ce04644ad9036ca146d2084895</a>)";
    // loadBlocks.uid = "blocks";

    // //

    // // const loadD3Dependencies = function(Graph) {
    // //     qwest.get('d3.csv').then((_, csvData) => {
    // //         const { data: [, ...data] } = Papa.parse(csvData); // Parse csv
    // //         data.pop(); // Remove last empty row

    // //         const nodes = [], links = [];
    // //         data.forEach(([size, path]) => {
    // //             const levels = path.split('/'),
    // //                 module = levels.length > 1 ? levels[1] : null,
    // //                 leaf = levels.pop(),
    // //                 parent = levels.join('/');

    // //             nodes.push({
    // //                 path,
    // //                 leaf,
    // //                 module,
    // //                 size: +size || 1
    // //             });

    // //             if (parent) {
    // //                 links.push({ source: parent, target: path});
    // //             }
    // //         });

    // //         Graph
    // //             .cooldownTicks(300)
    // //             .nodeRelSize(0.5)
    // //             .idField('path')
    // //             .valField('size')
    // //             .nameField('path')
    // //             .autoColorBy('module')
    // //             .forceEngine('ngraph')
    // //             .graphData({ nodes: nodes, links: links });
    // //     });
    // // };
    // // loadD3Dependencies.description = "<em>D3 dependencies</em> data (<a href='https://bl.ocks.org/mbostock/9a8124ccde3a4e9625bc413b48f14b30'>9a8124ccde3a4e9625bc413b48f14b30</a>)";

    // const tunnel = function(Graph) {

    //     const perimeter = 12,
    //         length = 30;

    //     const getId = (col, row) => `${col},${row}`;

    //     let nodes = [],
    //         links = [];
    //     for (let colIdx = 0; colIdx < perimeter; colIdx++) {
    //         for (let rowIdx = 0; rowIdx < length; rowIdx++) {
    //             const id = getId(colIdx, rowIdx);
    //             nodes.push({ id });

    //             // Link vertically
    //             if (rowIdx > 0) {
    //                 links.push({ source: getId(colIdx, rowIdx - 1), target: id });
    //             }

    //             // Link horizontally
    //             links.push({ source: getId((colIdx || perimeter) - 1, rowIdx), target: id });
    //         }
    //     }

    //     Graph
    //         .cooldownTicks(300)
    //         .forceEngine('ngraph')
    //         .graphData({ nodes: nodes, links: links });
    // };
    // tunnel.description = "fabric data for a cylindrical tunnel shape";
    // tunnel.uid = "tunnel";

    // //

    // return [loadEniac,
    //     loadChain,
    //     loadTTY,
    //     loadVDU,
    //     loadMainFrameDisconnect,
    //     loadMainFrameNet,
    //     loadPC,
    //     loadPCS,
    //     loadPCSS,
    //     loadPCSNet,
    //     loadPCSSNet,
    //     loadCloud,
    //     loadEdge,
    //     loadFog,
    //     loadCHRIS,
    //     loadMiserables,
    //     loadBlocks,
    //     // loadD3Dependencies, 
    //     tunnel
    // ];

    return l_graphFunction;
}