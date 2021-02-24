const Token = class Token {

    constructor() {
        this.token = {
            type: "",
            value: "",
            id: "",
            position: {
                start: {
                    line: "",
                    column: ""
                },
                end: {
                    line: "",
                    column: ""
                }
            },
            feature: {}
        }
    }

    setType(type) {
        this.token.type = type;
    }

    getType() {
        return this.token.type;
    }

    setValue(value) {
        this.token.value = value;
    }

    getValue() {
        return this.token.value
    }

    setId(id) {
        this.token.id = id;
    }

    getId() {
        return this.token.id
    }

    setPositionStartLine(line) {
        this.token.position.start.line = line;
    }

    getPositionStartLine() {
        return this.token.position.start.line
    }

    setPositionStartColumn(column) {
        this.token.position.start.column = column;
    }

    getPositionStartColumn() {
        return this.token.position.start.column;
    }

    setPositionEndLine(line) {
        this.token.position.end.line = line;
    }

    getPositionEndLine() {
        return this.token.position.end.line
    }

    setPositionEndColumn(column) {
        this.token.position.end.column = column;
    }

    getPositionEndColumn() {
        return this.token.position.end.column;
    }

    setFeature(feature) {
        this.token.feature = feature;
    }

    getFeature() {
        return this.token.feature;
    }

}

export default Token;