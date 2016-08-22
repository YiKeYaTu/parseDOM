'use strict'
let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title></title>
    </head>
    <body>2121
        <div id="caonima">
            <p class="ca" data="<div id=''></div>"><span></span></p>
        </div>
    </body>
    </html>
`;

function parseDOM (html) {
    this.html = html;
    this.attr = {};
    this.note = {};

    this.nodeTree = [];

    this._keepAttr();
    this._matchTag();
} 

parseDOM.prototype._matchTag = function () {
    const TAG_EXP = /<\s*[\/a-zA-Z]+(0\.\d+)?\s*>/g,
          TAG_NAME_EXP = /[A-Za-z]+/,
          RAND_STR_EXP = /0\.\d+/,
          END_TAG_EXP = /<\s*\/[a-zA-Z]+\s*>/;

    let treeArray = [];
    let n;

    this.html = this.html.replace(TAG_EXP, (str) => {
        let strArray = str.match(RAND_STR_EXP);
        let tagName = str.match(TAG_NAME_EXP)[0],
            attr = this.attr[strArray && strArray[0]];

        if (str.match(END_TAG_EXP)) {
            treeArray.pop();
            n = treeArray[treeArray.length - 1];
            return str;
        }

        let node = {
            tagName: tagName,
            tagHash: this.roundStr(),
            attr: attr,
            children: [],
        };
        if (!n) {
            n = node;
            this.nodeTree.push(n);
        } else {
            n.children.push(node);
        }
        treeArray.push(node);
        n = treeArray[treeArray.length - 1];
        return str.replace(RAND_STR_EXP, (str) => {
            return this.attr[str];
        });
    })
    console.log(this.html);

}

parseDOM.prototype._keepAttr = function () {
    const TAG_EXP = /<.+?\s+([^\s=]+\s*=\s*(('.+?')|(".+?"))\s*)+?>/g,
          ATTR_EXP = /\s+([^\s=]+\s*=\s*(('.+?')|(".+?"))\s*)+/g;

    let randomStr;

    this.html = this.html.replace(TAG_EXP, (str) => {
        return str.replace(ATTR_EXP, (match) => {
            randomStr = this.roundStr();
            this.attr[randomStr] = match;
            return randomStr;
        });
    });
    // console.log(this.attr);
    // console.log(this.html);
}

parseDOM.prototype._keepNote = function () {

}

parseDOM.prototype.roundStr = function () {
    let str = Math.random();
    return (this.attr[str] || this.html.indexOf(str) > -1) ? this.roundStr() : str;
}

let tree = new parseDOM(html);
