import * as THREE from 'three';

export class Grid {
    //400, 100   0x101010    0, 0, -100
    constructor([sizeX, sizeY], color, position) {
        this.gridHelper = new THREE.GridHelper(sizeX, sizeY, color, color);
        this.gridHelper.rotateX(Math.PI * 0.5);
        this.gridHelper.position.set(...position);
        this.gridHelper.receiveShadow = true;
    }

    setRenderOption(renderOrder) {
        this.gridHelper.renderOrder = renderOrder
    }
    getRenderOption() {
        return this.gridHelper.renderOrder
    }
    getGrid() {
        return this.gridHelper
    }
}