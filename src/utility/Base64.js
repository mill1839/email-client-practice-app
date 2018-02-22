/**
 * Base 64 is a way of serializing data so that it takes up less space and
 * doesn’t need to be escaped for use in strings, etc. This encodes and decodes
 * from URL-safe base 64 (a varient of the standard which substitutes
 * `_` for `/` and `-` for `+`) and UTF-8 encoded strings.
 *
 * Taken from MDN: https://goo.gl/1Gq51o
 *
 * @providesModule Base64
 * @flow
 */

import base64js from 'base64-js';
import { TextDecoderLite, TextEncoderLite } from 'text-encoder-lite';

export opaque type URLSafeBase64 = string;

export default class Base64 {
  static decode(data: URLSafeBase64): string {
    const nonUrlSafeBase64 = data.replace(/_/g, '/').replace(/-/g, '+');
    const bytes = base64js.toByteArray(nonUrlSafeBase64);
    return new (TextDecoder || TextDecoderLite)('utf-8').decode(bytes);
  }

  static encode(str: string): URLSafeBase64 {
    const bytes = new (TextEncoder || TextEncoderLite)().encode(str);
    const nonUrlSafeBase64 = base64js.fromByteArray(bytes);
    return nonUrlSafeBase64.replace(/\//g, '_').replace(/\+/g, '-');
  }
}


//IMORT THIS FILE (BASE64) FROM UTILITY Base64.js
// Base64.decode('data') ; data can be whatever variable i choose to represent data in object
//
// get parts by mimetype
//