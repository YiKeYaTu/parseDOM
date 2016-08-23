'use strict'
let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title></title>
    </head>
    <body>2121
        <div id="caonima" hh="sa">
            <!-- saf -->
            <p class="ca" data="<div id=''></div>"><span></span></p>
        </div>
    </body>
    </html>
`;

class DOM {

    constructor (domTree) {
        super();
        this.domTree = domTree;
    }

    _walk (fn/*, startDOM*/) {

        if (arguments[1]) {
            
        }

    }

    getElementById (id) {

    }

}

class parseDOM {

    constructor (htmlString) {
        super();
        this.htmlString = htmlString;
        this.DOM = this._match();
        return new DOM(this.DOM);
    }

    _match () {
        const TAG_EXP = /<(?:[a-zA-Z]+?)\s*(?:.+?\s*=\s*(?:(?:'.+?')|(?:".+?"))\s*)*>|<\/[a-zA-Z]+\s*>/g,
              NODENAME_EXP = /<([a-zA-Z]+)\s*/,
              ATTR_EXP = /([^<>\s\n]+)\s*=\s*((?:'.+?')|(?:".+?"))/g,
              END_EXP = /^<\/[a-zA-Z]+\s*>/;

        let tagArr = [];

        let nodeName, attr, nodeElement;

        let domTree = [], n;

        this.htmlString.replace(TAG_EXP, (item, index) => {
            if (item.match(END_EXP)) {
                nodeElement = tagArr.pop();
                if (nodeElement) nodeElement.innerHTML = this.htmlString.slice(nodeElement.index, index);
                n = tagArr[tagArr.length - 1];
                return item;
            }

            nodeName = item.match(NODENAME_EXP)[1];
            attr = item.match(ATTR_EXP);

            attr && (attr = attr.map((item) => {
                return this._parseAttr(item);
            }));

            nodeElement = {
                nodeName,
                attr,
                index: index + item.length,
                children: []
            };


            tagArr.push(nodeElement);

            if (!n) {
                domTree.push(nodeElement);
            } else {
                n.children.push(nodeElement);
            }
            n = nodeElement;

            return item;
        });

        return domTree;
    }

    _parseAttr (attrString) {
        const VAL_KEY = /(.+?)=((?:'.+')|(?:".+"))/;
        let match = attrString.match(VAL_KEY);
        return {
            key: match[1],
            value: match[2],
        }
    }

}



let tree = new parseDOM(html);
