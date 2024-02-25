import ReactCodeMirror from "@uiw/react-codemirror";
import React from "react";
// import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


// loadLanguage('tsx');
// langs.tsx();
const CodeEditor = () => {

    const [value, setValue] = React.useState("console.log('hello world!');");

    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);

    const onChange = React.useCallback((val: any) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return <ReactCodeMirror
        value={value}
        height="100vh"
        extensions={[loadLanguage(currentLanguage)!]} onChange={onChange}
        theme={draculaInit({
            settings: {
                caret: '#c6c6c6',
                fontFamily: 'monospace',
            },
            styles: [
                { tag: t.comment, color: '#6272a4' },
            ]
        })}
    />;
}

export default CodeEditor
