use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(value: &str) {
    let js_value = &value.into();
    console::log_1(js_value);
    
}