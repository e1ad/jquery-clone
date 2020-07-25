class JqueryClone {

    static elementsToArray = (elements) => [...elements];

    static isElement = (value) => value instanceof Element;

    static isObject = (value) => typeof (value) === 'object' && !Array.isArray(value);

    static htmlToElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();

        return template.content.firstChild;
    }

    static forEach(object, callback) {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                callback(object[key], key)
            }
        }
    }

    static replaceWith(targetElement, replaceWith) {
        targetElement.replaceWith(JqueryClone.isElement(replaceWith) ? replaceWith : JqueryClone.htmlToElement(replaceWith));
    }

    constructor(elements) {
        this.elements = elements.length ? elements : [elements];
    }

    hide() {
        this.elements.forEach(element => {
            if (element.comment) {
                return;
            }

            console.dir(element.outerHTML);

            element.comment = document.createComment(element.outerHTML);
            element.replaceWith(element.comment);
        });

        return this;
    }

    show() {
        this.elements.forEach(element => {
            JqueryClone.replaceWith(element.comment, element.comment.nodeValue);
            delete element.comment;
        });
    }

    css(property, value) {
        this.elements.forEach(element => {

            if (JqueryClone.isObject(property)) {

                JqueryClone.forEach(property, (value, key) => {
                    element.style[key] = value;
                });

                return;
            }

            element.style[property] = value;
        });

        return this;
    };

    attr(key, value) {
        this.elements.forEach(element => {
            element.setAttribute(key, value);
        });

        return this;
    };

    addClass(key, value) {
        this.elements.forEach(element => {
            element.classList.add(key, value);
        });

        return this;
    }

    removeClass(key, value) {
        this.elements.forEach(element => {
            element.classList.remove(key, value);
        });

        return this;
    }

    bind(eventName, callback, capture) {

        const unBinds = JqueryClone.elementsToArray(this.elements).map(element => {

            const bindCallback = callback.bind(element);

            element.addEventListener(eventName, bindCallback, capture);

            return () => {
                element.removeEventListener(eventName, bindCallback);
            };
        });

        return () => {
            unBinds.forEach(unBind => {
                unBind();
            });
        }

    }


}


const $ = (...args) => {
    if (JqueryClone.isElement(args[0])) {
        return new JqueryClone(args[0]);
    }

    switch (typeof args[0]) {
        case 'function':
            document.addEventListener("DOMContentLoaded", args[0]);
            break;
        case 'string':
            const elements = document.querySelectorAll(args[0]);
            return new JqueryClone(elements);
    }


};

