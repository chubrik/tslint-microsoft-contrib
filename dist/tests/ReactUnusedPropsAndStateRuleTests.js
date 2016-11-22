"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('reactUnusedPropsAndStateRule', function () {
    var ruleName = 'react-unused-props-and-state';
    it('should pass on referenced Props and State', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    myProp1: boolean;\n                    myProp2: boolean;\n                }\n                export interface State {\n                    myState1: boolean;\n                    myState2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, VideoContainer.State> {\n\n                constructor(props: VideoContainer.Props) {\n                    super(props);\n                }\n\n                public render(): ReactTypes.ReactElement<any> {\n                    console.log(this.props.myProp1);\n                    console.log(this.props.myProp2);\n                    console.log(this.state.myState1);\n                    console.log(this.state.myState2);\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on referenced Props and State functions', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    myProp: ();\n                }\n                export interface State {\n                    myState: ();\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, VideoContainer.State> {\n                public render(): ReactTypes.ReactElement<any> {\n                    console.log(this.props.myProp());\n                    console.log(this.state.myState());\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when props and state escape the class/function', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    myProp: ();\n                }\n                export interface State {\n                    myState: ();\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, VideoContainer.State> {\n                public render(): ReactTypes.ReactElement<any> {\n                    console.log(this.props); // this.props has escaped the function and might be used elsewhere\n                    console.log(this.state);\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when props referenced from constructor parameter', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    myProp: ();\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, {}> {\n                constructor(props: VideoContainer.Props) {\n                    super(props);\n                    console.log(props.myProp());\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when props referenced from constructor parameter', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    myProp: ();\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, {}> {\n                constructor(props: VideoContainer.Props) {\n                    super(props);\n                    console.log(props.myProp());\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when props referenced from lifecycle method ', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    prop1: boolean;\n                    prop2: boolean;\n                    prop3: boolean;\n                    prop4: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, {}> {\n                public componentWillReceiveProps(nextProps: P, nextContext: any): void {\n                    console.log(nextProps.prop1);\n                }\n                public shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any): boolean {\n                    console.log(nextProps.prop2);\n                    return true;\n                }\n                public componentWillUpdate(nextProps: P, nextState: S, nextContext: any): void {\n                    console.log(nextProps.prop3);\n                }\n                public componentDidUpdate(prevProps: P, prevState: S, prevContext: any): void {\n                    console.log(prevProps.prop4);\n                }\n\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when state referenced from lifecycle method ', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface State {\n                    state1: boolean;\n                    state2: boolean;\n                    state3: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<{}, VideoContainer.State> {\n                public shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any): boolean {\n                    console.log(nextState.state1);\n                    return true;\n                }\n                public componentWillUpdate(nextProps: P, nextState: S, nextContext: any): void {\n                    console.log(nextState.state2);\n                }\n                public componentDidUpdate(prevProps: P, prevState: S, prevContext: any): void {\n                    console.log(prevState.state3);\n                }\n\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when state escapes from shouldComponentUpdate', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface State {\n                    state1: boolean;\n                    state2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<{}, VideoContainer.State> {\n                public shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any): boolean {\n                    console.log(nextState);\n                    return true;\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when state escapes from componentWillUpdate', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface State {\n                    state1: boolean;\n                    state2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<{}, VideoContainer.State> {\n                public componentWillUpdate(nextProps: P, nextState: S, nextContext: any): void {\n                    console.log(nextState);\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when state escapes from componentDidUpdate', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface State {\n                    state1: boolean;\n                    state2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<{}, VideoContainer.State> {\n                public componentDidUpdate(prevProps: P, prevState: S, prevContext: any): void {\n                    console.log(prevState);\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when props escapes from componentWillReceiveProps ', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    prop1: boolean;\n                    prop2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, {}> {\n                public componentWillReceiveProps(nextProps: P, nextContext: any): void {\n                    console.log(nextProps);\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when props escapes from shouldComponentUpdate ', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    prop1: boolean;\n                    prop2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, {}> {\n                public shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any): boolean {\n                    console.log(nextProps);\n                    return true;\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when props escapes from componentWillUpdate', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    prop1: boolean;\n                    prop2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, {}> {\n                public componentWillUpdate(nextProps: P, nextState: S, nextContext: any): void {\n                    console.log(nextProps);\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when props escapes from componentDidUpdate ', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    prop1: boolean;\n                    prop2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, {}> {\n                public componentDidUpdate(prevProps: P, prevState: S, prevContext: any): void {\n                    console.log(prevProps);\n                }\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on referenced Props and State even when interfaces defined at end', function () {
        var script = "\n            module SomeModule {\n                export class SomeComponent extends SomeBaseComponent<Props, State> {\n                    public render() {\n                        console.log(this.props.myProp);\n                        console.log(this.state.myState);\n                        return null;\n                    }\n                }\n\n                export interface Props {\n                    myProp: string;\n                }\n\n                export interface State {\n                    myState: string;\n                }\n            }\n            export = SomeModule;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on unused Props and State', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    myProp1: boolean;\n                    myProp2: boolean;\n                }\n                export interface State {\n                    myState1: boolean;\n                    myState2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, VideoContainer.State> {\n                constructor(props: VideoContainer.Props) {\n                    super(props);\n                }\n\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unused React property defined in interface: myProp1",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 6 }
            },
            {
                "failure": "Unused React property defined in interface: myProp2",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 7 }
            },
            {
                "failure": "Unused React state defined in interface: myState1",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 10 }
            },
            {
                "failure": "Unused React state defined in interface: myState2",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 11 }
            }
        ]);
    });
    it('should fail on unused Props and State with custom names', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface IProps {\n                    myProp1: boolean;\n                    myProp2: boolean;\n                }\n                export interface IState {\n                    myState1: boolean;\n                    myState2: boolean;\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.IProps, VideoContainer.IState> {\n                constructor(props: VideoContainer.IProps) {\n                    super(props);\n                }\n\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        var options = [true,
            {
                'props-interface-regex': 'Props$',
                'state-interface-regex': 'State$'
            }
        ];
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, script, [
            {
                "failure": "Unused React property defined in interface: myProp1",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 6 }
            },
            {
                "failure": "Unused React property defined in interface: myProp2",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 7 }
            },
            {
                "failure": "Unused React state defined in interface: myState1",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 10 }
            },
            {
                "failure": "Unused React state defined in interface: myState2",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 11 }
            }
        ]);
    });
    it('should fail on unused Props and State functions', function () {
        var script = "\n            import React = require('react');\n\n            module VideoContainer {\n                export interface Props {\n                    myProp: ();\n                }\n                export interface State {\n                    myState: ();\n                }\n            }\n\n            class VideoContainer extends React.Component<VideoContainer.Props, VideoContainer.State> {\n                public render(): ReactTypes.ReactElement<any> {\n                    return null;\n                }\n            }\n            export = VideoContainer;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unused React property defined in interface: myProp",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 6 }
            },
            {
                "failure": "Unused React state defined in interface: myState",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 9 }
            }
        ]);
    });
    it('should fail when props are referenced in a ternary expression', function () {
        var script = "\n            import React = require('react');\n\n            module AssigneePicker {\n\n                export interface State {\n                    myState1: boolean;\n                    myState2: boolean;\n                }\n\n                export interface Props {\n                    myProps1: string;\n                    myProps2: string;\n                }\n            }\n\n            abstract class AssigneePicker<P extends AssigneePicker.Props, S extends AssigneePicker.State> extends BaseReactComponent<P, S> {\n\n                public render(): ReactTypes.ReactElement<ReactTypes.HTMLAttributes> {\n                    const foo = this.state.myState1 ? null : null;\n                    const bar = this.props.myProps1 ? null : null;\n                    return null;\n                }\n            }\n\n            export = AssigneePicker;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unused React property defined in interface: myProps2",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 13 }
            },
            {
                "failure": "Unused React state defined in interface: myState2",
                "name": "file.tsx",
                "ruleName": "react-unused-props-and-state",
                "startPosition": { "character": 21, "line": 8 }
            }
        ]);
    });
});
