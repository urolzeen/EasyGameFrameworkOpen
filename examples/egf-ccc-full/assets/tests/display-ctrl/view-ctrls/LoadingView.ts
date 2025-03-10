import { NodeCtrl } from "@ailhc/dpctrl-ccc";
import { getPrefabNodeByPath } from "../../../src/Utils";
import { DpcTestLayerType } from "../DpcTestLayerType";
import { dtM } from "../setDpcTestModuleMap";
declare global {
    interface IDpcTestViewKeyMap {
        LoadingView: "LoadingView";
    }
    interface IDpcTestUpdateDataMap {
        LoadingView: { finished: number; total: number };
    }
}
export class LoadingView extends NodeCtrl {
    static typeKey: string = "LoadingView";
    private static _ress: { path: string; type: any }[];
    public static prefabUrl = "display-ctrl-test-views/LoadingView";
    getRess() {
        if (!LoadingView._ress) {
            LoadingView._ress = [{ path: LoadingView.prefabUrl, type: cc.Prefab }];
        }
        return LoadingView._ress;
    }
    private _tipsLabel: cc.Label;
    onInit() {
        super.onInit();
        this.node = getPrefabNodeByPath(LoadingView.prefabUrl);
        this._tipsLabel = this.node.getChildByName("loadingTips").getComponent(cc.Label);
    }
    onShow(config: displayCtrl.IShowConfig) {
        super.onShow(config);
        dtM.layerMgr.addNodeToLayer(this.node, DpcTestLayerType.POP_UP_UI);
        this._tipsLabel.string = "加载中...";
    }
    onUpdate(data: IDpcTestUpdateDataMap["LoadingView"]) {
        this._tipsLabel.string = `加载中${data.finished}/${data.total}...`;
    }
    onHide() {
        super.onHide();
    }
    onDestroy(destroyRes?: boolean) {
        if (destroyRes) {
            cc.assetManager.releaseAsset(cc.resources.get(LoadingView.prefabUrl, cc.Prefab));
        }
    }
}
