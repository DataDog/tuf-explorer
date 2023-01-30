/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { joinPath } from "./utils";

const commonPrefix = '';
export const reposRootDir = joinPath([commonPrefix, 'repos']);
export const keyInfoRootDir = joinPath([commonPrefix, 'helper']);
