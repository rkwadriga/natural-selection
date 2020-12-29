// tsc app.ts && node app.js

import {Engine} from './src/Engine';
import {EngineParams} from './src/EngineParams';
import {ConsoleClient} from './src/ConsoleClient';
import {Field} from "./src/Field";

let params = new EngineParams();
params.creaturesCount = 20;
params.runtime = 60;
params.runSpeed = 10;

let fieldWidth: number = 30;
let fieldHeight: number = 15;

let field = new Field(fieldWidth, fieldHeight);
let client = new ConsoleClient(field);
let eng = new Engine(client, params);
eng.run();

