import { BASE_FONT_SIZE, ICON_SIZE_SMALL, SCREEN_MARGIN_X, SCREEN_MARGIN_Y, SCREEN_WIDTH, WIDGET_WIDTH } from "./UiParams";
import { TouchEventManager } from "./TouchEventManager";
export class ListScreen {
    constructor() {
        this.positionY = SCREEN_MARGIN_Y;
        this.fontSize = BASE_FONT_SIZE;
        this.accentColor = 0x0077AA;
        this.entries = [];
        this.frameCount = 0;
        this.lastFrameTime = 0;
        this.frameTimes = [];
        this.frameMetrics = {
            lastFrameTime: 0,
            frames: [],
            layoutTimes: [],
            renderTimes: [],
            totalFrames: 0,
            logMetrics() {
                if (this.frames.length >= 1000) {
                    const meanFrameTime = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
                    const meanLayoutTime = this.layoutTimes.reduce((a, b) => a + b, 0) / this.layoutTimes.length;
                    const meanRenderTime = this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length;
                    console.log(`[ListScreen] Performance (1000 frames):
          Mean frame time: ${meanFrameTime.toFixed(2)}ms
          Mean layout time: ${meanLayoutTime.toFixed(2)}ms 
          Mean render time: ${meanRenderTime.toFixed(2)}ms
          Total frames: ${this.totalFrames}
        `);
                    // Reset metrics
                    this.frames = [];
                    this.layoutTimes = [];
                    this.renderTimes = [];
                }
            }
        };
    }
    measureFrame(phase, callback) {
        const start = Date.now();
        callback();
        const duration = Date.now() - start;
        if (phase === 'layout') {
            this.frameMetrics.layoutTimes.push(duration);
        }
        else {
            this.frameMetrics.renderTimes.push(duration);
            // Track full frame time
            const frameTime = duration + (this.frameMetrics.layoutTimes[this.frameMetrics.layoutTimes.length - 1] || 0);
            this.frameMetrics.frames.push(frameTime);
            this.frameMetrics.totalFrames++;
            this.frameMetrics.logMetrics();
        }
    }
    createWidget(type, options) {
        return hmUI.createWidget(type, options);
    }
    createChildWidget(parent, type, options) {
        return parent.createWidget(type, options);
    }
    updateWidget(widget, options) {
        widget.setProperty(hmUI.prop.MORE, options);
    }
    build() { }
    _createBaseEntry() {
        return {
            widget: {},
            viewHeight: 0,
            positionY: this.positionY,
            _setPositionY: (y) => { },
        };
    }
    _registerRow(entry) {
        entry._lastHeight = entry.viewHeight;
        entry._index = this.entries.length;
        this.entries.push(entry);
        this.positionY += entry.viewHeight;
    }
    onHeightChange(entry) {
        const delta = entry.viewHeight - (entry._lastHeight || 0);
        this.positionY += delta;
        entry._lastHeight = entry.viewHeight;
        for (let i = (entry._index || 0) + 1; i < this.entries.length; i++) {
            this.entries[i]._setPositionY(this.entries[i].positionY + delta);
        }
    }
    get baseRowHeight() {
        if (this.fontSize !== this._brh_lastheight) {
            this._brh_lastheight = this.fontSize;
            this._brh_cached = hmUI.getTextLayout(" ", {
                text_size: this.fontSize,
                text_width: 96,
            }).height + 36;
        }
        return this._brh_cached || 0;
    }
    headline(text) {
        const lineHeight = Math.floor(BASE_FONT_SIZE * 1.5);
        const config = {
            x: SCREEN_MARGIN_X + 4,
            w: WIDGET_WIDTH - 8,
            h: lineHeight,
            color: this.accentColor,
            align_v: hmUI.align.CENTER_V,
            y: this.positionY,
            text_size: BASE_FONT_SIZE - 4,
            text
        };
        const widget = hmUI.createWidget(hmUI.widget.TEXT, config);
        const entry = Object.assign(Object.assign({}, this._createBaseEntry()), { widget, viewHeight: lineHeight, positionY: this.positionY, _setPositionY: (y) => {
                entry.positionY = y;
                this.updateWidget(widget, Object.assign(Object.assign({}, config), { y: y }));
            } });
        this._registerRow(entry);
        return entry;
    }
    offset(height = SCREEN_MARGIN_Y) {
        const config = {
            x: 0,
            y: this.positionY,
            w: SCREEN_WIDTH,
            h: height
        };
        const widget = hmUI.createWidget(hmUI.widget.IMG, config);
        const entry = Object.assign(Object.assign({}, this._createBaseEntry()), { widget, positionY: this.positionY, viewHeight: height, _setPositionY: (y) => {
                entry.positionY = y;
                this.updateWidget(widget, Object.assign(Object.assign({}, config), { y: y }));
            } });
        this._registerRow(entry);
        return entry;
    }
    card(userConfig) {
        const config = Object.assign({ color: 0x111111, offsetX: 0, radius: 8, width: WIDGET_WIDTH, height: 0, hiddenButton: '', hiddenButtonCallback: () => { }, onTap: () => { }, dontChangePosY: false }, userConfig);
        const entry = Object.assign({}, this._createBaseEntry());
        entry.positionY = this.positionY;
        // Add proper margin between cards
        const marginY = 8;
        const effectiveY = this.positionY + (config.dontChangePosY ? 0 : marginY / 2);
        // Create group with proper dimensions
        entry.group = hmUI.createWidget(hmUI.widget.GROUP, {
            x: SCREEN_MARGIN_X + config.offsetX,
            y: effectiveY,
            w: config.width,
            h: config.height
        });
        entry.widget = entry.group;
        // Create background with proper styling
        const bg = this.createChildWidget(entry.group, hmUI.widget.FILL_RECT, {
            x: 0,
            y: 0,
            w: config.width,
            h: config.height,
            color: config.color,
            radius: config.radius
        });
        // Create touch area for the entire card
        const touchArea = this.createChildWidget(entry.group, hmUI.widget.BUTTON, {
            x: 0,
            y: 0,
            w: config.width,
            h: config.height,
            text: '',
            color: 0x000000,
            alpha: 0,
            click_func: () => {
                if (config.onTap)
                    config.onTap();
            }
        });
        // Handle dontChangePosY properly
        entry.viewHeight = config.dontChangePosY ? 0 : config.height + marginY;
        entry._setPositionY = (y) => {
            var _a;
            const effectiveNewY = y + (config.dontChangePosY ? 0 : marginY / 2);
            entry.positionY = y;
            (_a = entry.group) === null || _a === void 0 ? void 0 : _a.setProperty(hmUI.prop.Y, effectiveNewY);
            bg.setProperty(hmUI.prop.Y, 0);
        };
        if (config.hiddenButton) {
            const buttonWidth = 96;
            const buttonConfig = {
                x: config.width - buttonWidth,
                y: 0,
                w: buttonWidth,
                h: config.height,
                text: config.hiddenButton,
                text_size: this.fontSize - 4,
                color: 0xFFFFFF,
                normal_color: this.accentColor,
                press_color: 0x005588,
                radius: config.radius,
                text_style: hmUI.text_style.NONE,
                click_func: () => {
                    if (config.hiddenButtonCallback)
                        config.hiddenButtonCallback();
                }
            };
            const button = this.createChildWidget(entry.group, hmUI.widget.BUTTON, buttonConfig);
        }
        this._registerRow(entry);
        return entry;
    }
    _getButtonConfig(config, y) {
        return {
            x: config.offsetX + config.width - 96,
            y: 0,
            w: 96,
            h: config.height,
            color: 0xFFFFFF,
            radius: config.radius,
            text: config.hiddenButton,
            text_size: this.fontSize - 4,
            normal_color: this.accentColor,
            press_color: this.accentColor,
        };
    }
    _createCenteredIcon(parent, config) {
        return this.createChildWidget(parent, hmUI.widget.IMG, {
            x: config.x,
            y: config.y,
            w: config.size,
            h: config.size,
            src: config.src
        });
    }
    logFrameTime() {
        const currentTime = Date.now();
        if (this.lastFrameTime !== 0) {
            const frameTime = currentTime - this.lastFrameTime;
            this.frameTimes.push(frameTime);
            this.frameCount++;
            if (this.frameCount % 1000 === 0) {
                const meanFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
                console.log(`[ListScreen] Performance: Mean frame time over last 1000 frames: ${meanFrameTime.toFixed(2)}ms`);
                this.frameTimes = []; // Reset for next batch
            }
        }
        this.lastFrameTime = currentTime;
    }
    row(userConfig) {
        // Measure layout phase
        let layoutData;
        this.measureFrame('layout', () => {
            layoutData = this.calculateRowLayout(userConfig);
        });
        // Measure render phase 
        let entry;
        this.measureFrame('render', () => {
            entry = this.createRowWidgets(layoutData);
        });
        return entry;
    }
    calculateRowLayout(userConfig) {
        var _a, _b, _c, _d, _e;
        const config = {
            color: userConfig.color || 0xFFFFFF,
            fontSize: userConfig.fontSize || 20,
            text: (_a = userConfig.text) !== null && _a !== void 0 ? _a : '',
            icon: (_b = userConfig.icon) !== null && _b !== void 0 ? _b : '',
            description: (_c = userConfig.description) !== null && _c !== void 0 ? _c : '',
            onTap: userConfig.onTap || userConfig.callback || (() => { }),
            card: userConfig.card || {},
            oneLine: (_d = userConfig.oneLine) !== null && _d !== void 0 ? _d : false,
            headlineWidth: (_e = userConfig.headlineWidth) !== null && _e !== void 0 ? _e : 0
        };
        const verticalPadding = 12;
        const iconSize = ICON_SIZE_SMALL;
        const textPaddingLeft = iconSize * 2;
        // Calculate text heights with proper wrapping
        const textWidth = this._getTextWidthForRow(config);
        const textHeight = hmUI.getTextLayout(config.text, {
            text_size: config.fontSize,
            text_width: textWidth
        }).height;
        const descHeight = config.description ? hmUI.getTextLayout(config.description, {
            text_size: config.fontSize - 2,
            text_width: textWidth
        }).height : 0;
        // Calculate total row height with proper spacing
        const rowHeight = Math.max(iconSize + (verticalPadding * 2), textHeight + (config.description ? descHeight + 8 : 0) + (verticalPadding * 2));
        const groupConfig = {
            x: SCREEN_MARGIN_X,
            y: this.positionY,
            w: WIDGET_WIDTH,
            h: rowHeight
        };
        const textY = config.description
            ? verticalPadding
            : Math.floor((rowHeight - textHeight) / 2);
        return {
            config,
            dimensions: {
                textWidth,
                textHeight,
                descHeight,
                rowHeight,
                textY,
                verticalPadding,
                iconSize,
                textPaddingLeft,
                groupConfig
            }
        };
    }
    createRowWidgets(layoutData) {
        var _a;
        const { config, dimensions } = layoutData;
        const entry = Object.assign({}, this._createBaseEntry());
        entry.viewHeight = dimensions.rowHeight + 8; // Add margin between rows
        entry.positionY = this.positionY;
        entry.group = this.createWidget(hmUI.widget.GROUP, dimensions.groupConfig);
        entry.widget = entry.group;
        // Use TouchEventManager for touch handling
        if (config.onTap) {
            entry.touchManager = new TouchEventManager(entry.group);
            entry.touchManager.ontouch = () => {
                config.onTap();
            };
        }
        // Main text with proper vertical centering
        const textView = this.createChildWidget(entry.group, hmUI.widget.TEXT, {
            x: dimensions.textPaddingLeft,
            y: dimensions.textY,
            w: dimensions.textWidth,
            h: dimensions.textHeight,
            text_style: hmUI.text_style.WRAP,
            align_v: hmUI.align.TOP,
            text_size: config.fontSize,
            color: config.color,
            text: config.text
        });
        entry.textView = textView;
        // Icon with proper vertical centering
        if (config.icon) {
            const iconY = Math.floor((dimensions.rowHeight - dimensions.iconSize) / 2);
            entry.iconView = this._createCenteredIcon(entry.group, {
                x: Math.floor(dimensions.iconSize / 2),
                y: iconY,
                size: dimensions.iconSize,
                src: config.icon
            });
        }
        // Description text with proper spacing
        if (config.description) {
            this.createChildWidget(entry.group, hmUI.widget.TEXT, {
                x: dimensions.textPaddingLeft,
                y: dimensions.textY + dimensions.textHeight + 4,
                w: dimensions.textWidth,
                h: dimensions.descHeight,
                text_style: hmUI.text_style.WRAP,
                align_v: hmUI.align.TOP,
                text_size: config.fontSize - 2,
                color: 0x999999,
                text: config.description
            });
        }
        // Create a "hidden" button if provided in config.card
        if (config.card.hiddenButton) {
            const buttonWidth = 96;
            this.createChildWidget(entry.group, hmUI.widget.BUTTON, {
                x: WIDGET_WIDTH - buttonWidth,
                y: 0,
                w: buttonWidth,
                h: dimensions.rowHeight,
                text: config.card.hiddenButton,
                text_size: this.fontSize - 4,
                color: 0xFFFFFF,
                normal_color: this.accentColor,
                press_color: 0x005588,
                radius: (_a = config.card.radius) !== null && _a !== void 0 ? _a : 8,
                text_style: hmUI.text_style.NONE,
                click_func: config.card.hiddenButtonCallback
            });
        }
        entry._setPositionY = (y) => {
            entry.positionY = y;
            this.updatePosition(entry.group, y, dimensions.groupConfig);
        };
        this._registerRow(entry);
        return entry;
    }
    _getTextWidthForRow(config) {
        const baseWidth = WIDGET_WIDTH - (ICON_SIZE_SMALL * 2) - 8;
        return config.oneLine ? baseWidth - (config.headlineWidth || 0) : baseWidth;
    }
    field(userConfig) {
        var _a, _b, _c;
        const config = {
            color: userConfig.color || 0xFFFFFF,
            headlineColor: userConfig.headlineColor || 0x999999,
            fontSize: userConfig.fontSize || 20,
            headlineFontSize: userConfig.headlineFontSize || 18,
            headline: (_a = userConfig.headline) !== null && _a !== void 0 ? _a : '',
            text: (_b = userConfig.text) !== null && _b !== void 0 ? _b : '',
            allowOneLine: userConfig.allowOneLine !== undefined ? userConfig.allowOneLine : true,
            headlineWidth: userConfig.headlineWidth || 140,
            onTap: userConfig.onTap || (() => { }),
            card: userConfig.card || {},
        };
        const oneLine = config.allowOneLine && WIDGET_WIDTH >= 300;
        const verticalPadding = 4;
        // Improved height calculations
        const headHeight = this._getTextHeight(config.headline, config.headlineFontSize, oneLine ? config.headlineWidth : WIDGET_WIDTH);
        const textHeight = this._getTextHeight(config.text, config.fontSize, WIDGET_WIDTH - (oneLine ? config.headlineWidth + 8 : 0));
        // Calculate total height with proper vertical alignment
        const rowHeight = oneLine
            ? Math.max(textHeight, headHeight) + (verticalPadding * 2)
            : headHeight + textHeight + (verticalPadding * 3);
        const entry = Object.assign({}, this._createBaseEntry());
        entry.viewHeight = rowHeight + 8; // Add margin between fields
        entry.positionY = this.positionY;
        const groupConfig = {
            x: SCREEN_MARGIN_X + (((_c = config.card) === null || _c === void 0 ? void 0 : _c.offsetX) || 0),
            y: this.positionY,
            w: WIDGET_WIDTH,
            h: rowHeight
        };
        entry.group = this.createWidget(hmUI.widget.GROUP, groupConfig);
        entry.widget = entry.group;
        entry.touchManager = new TouchEventManager(entry.group);
        // Headline with proper vertical alignment
        const headlineView = this.createChildWidget(entry.group, hmUI.widget.TEXT, {
            x: 0,
            y: verticalPadding,
            w: oneLine ? config.headlineWidth : WIDGET_WIDTH,
            h: oneLine ? rowHeight - (verticalPadding * 2) : headHeight,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.WRAP,
            text_size: config.headlineFontSize,
            color: config.headlineColor,
            text: config.headline
        });
        // Text with proper alignment and wrapping
        const textView = this.createChildWidget(entry.group, hmUI.widget.TEXT, {
            x: oneLine ? config.headlineWidth + 8 : 0,
            y: oneLine ? verticalPadding : headHeight + verticalPadding,
            w: WIDGET_WIDTH - (oneLine ? config.headlineWidth + 8 : 0),
            h: oneLine ? rowHeight - (verticalPadding * 2) : textHeight,
            align_h: oneLine ? hmUI.align.RIGHT : hmUI.align.LEFT,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.WRAP,
            text_size: config.fontSize,
            color: config.color,
            text: config.text
        });
        entry._setPositionY = (y) => {
            var _a;
            entry.positionY = y;
            (_a = entry.group) === null || _a === void 0 ? void 0 : _a.setProperty(hmUI.prop.Y, y);
        };
        if (config.onTap) {
            entry.touchManager.ontouch = config.onTap;
        }
        this._registerRow(entry);
        return entry;
    }
    text(userConfig) {
        const config = {
            color: userConfig.color || 0xFFFFFF,
            fontSize: userConfig.fontSize || 20,
            align: userConfig.align || hmUI.align.LEFT,
            topOffset: userConfig.topOffset || 0,
            bottomOffset: userConfig.bottomOffset || 0,
            card: userConfig.card || {},
            text: userConfig.text,
        };
        const verticalPadding = 4;
        const horizontalPadding = 4;
        const textWidth = WIDGET_WIDTH - (horizontalPadding * 2);
        // Improved height calculation with proper padding
        const textHeight = this._getTextHeight(config.text, config.fontSize, textWidth);
        const totalPadding = config.topOffset + config.bottomOffset + (verticalPadding * 2);
        const rowHeight = textHeight + totalPadding;
        const entry = Object.assign({}, this._createBaseEntry());
        entry.viewHeight = rowHeight + 8; // Add margin between text entries
        entry.positionY = this.positionY;
        // Text widget with proper alignment and wrapping
        entry.widget = this.createWidget(hmUI.widget.TEXT, {
            x: SCREEN_MARGIN_X + horizontalPadding,
            y: this.positionY + config.topOffset + verticalPadding,
            w: textWidth,
            h: rowHeight - totalPadding,
            align_v: hmUI.align.CENTER_V,
            align_h: config.align,
            text_style: hmUI.text_style.WRAP,
            text_size: config.fontSize,
            color: config.color,
            text: config.text
        });
        entry._setPositionY = (y) => {
            entry.positionY = y;
            entry.widget.setProperty(hmUI.prop.Y, y + config.topOffset + verticalPadding);
        };
        this._registerRow(entry);
        return entry;
    }
    twoActionBar(items) {
        if (WIDGET_WIDTH < 300) {
            const row1 = this.row(items[0]);
            this.row(items[1]);
            return row1;
        }
        const secondSize = this.baseRowHeight;
        const firstWidth = WIDGET_WIDTH - secondSize - 8;
        const button = this.card({
            width: secondSize,
            height: secondSize,
            offsetX: firstWidth + 8,
            radius: Math.floor(secondSize / 2),
            color: this.accentColor,
            onTap: items[1].callback
        });
        const iconPos = Math.floor((secondSize - ICON_SIZE_SMALL) / 2);
        button.group.createWidget(hmUI.widget.IMG, {
            x: iconPos,
            y: iconPos,
            src: items[1].icon
        });
        const row = this.row(Object.assign(Object.assign({}, items[0]), { card: {
                width: firstWidth,
                radius: Math.floor(secondSize / 2),
            }, onTap: items[0].callback }));
        return row;
    }
    checkboxRow(config) {
        let value = !!config.value;
        const row = this.row(Object.assign(Object.assign({}, config), { text: config.text || '', icon: value ? config.iconTrue : config.iconFalse, onTap: () => {
                var _a;
                value = !value;
                (_a = row.iconView) === null || _a === void 0 ? void 0 : _a.setProperty(hmUI.prop.SRC, value ? config.iconTrue : config.iconFalse);
                config.callback(value);
            } }));
        return row;
    }
    image(config) {
        const card = this.card({ height: config.height + 8, color: 0 });
        card.group.createWidget(hmUI.widget.IMG, {
            x: 0,
            y: 0,
            w: config.width,
            h: config.height,
            auto_scale: config.auto_scale,
            src: config.src
        });
        return card;
    }
    toggleGroup(config) {
        var _a;
        let value = config.value;
        const views = [];
        const callback = (row) => {
            var _a;
            value = row.value;
            for (let i of views) {
                (_a = i.iconView) === null || _a === void 0 ? void 0 : _a.setProperty(hmUI.prop.SRC, value === i.value ? config.iconTrue : config.iconFalse);
            }
            config.callback(value);
        };
        for (const item of config.options) {
            const rowConfig = {
                text: (_a = item.name) !== null && _a !== void 0 ? _a : '',
                icon: value === item.value ? config.iconTrue : config.iconFalse,
                onTap: () => callback(rowConfig)
            };
            const row = this.row(rowConfig);
            row.value = item.value;
            views.push(row);
        }
    }
    _getTextHeight(text, fontSize, maxWidth) {
        const textWidth = maxWidth || WIDGET_WIDTH - 8;
        return hmUI.getTextLayout(text, {
            text_size: fontSize,
            text_width: textWidth
        }).height;
    }
    updatePosition(widget, y, originalConfig) {
        this.updateWidget(widget, Object.assign(Object.assign({}, originalConfig), { y }));
    }
}
