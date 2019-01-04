/*
 * Copyright (c) 2018 Confetti Interactive Inc.
 * 
 * This file is part of The-Forge
 * (see https://github.com/ConfettiFX/The-Forge).
 * 
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/
cbuffer ESMInputConstants : register(b3)
{
    float2 ScreenDimension;
    float2 NearFarDist;
    float Exponent;
    uint BlurWidth;
    int IfHorizontalBlur;
    int padding;
};
struct PsIn {
	float4 Position : SV_POSITION;
};
float map_01(float x, float v0, float v1)
{
    return (x - v0) / (v1 - v0);
}

float main(PsIn input) : SV_Target
{
#if 1//ESM
    float mappedDepth = map_01(input.Position.w, NearFarDist.x, NearFarDist.y);
    return exp(Exponent * mappedDepth);
#else
    return input.Position.z;
#endif

}