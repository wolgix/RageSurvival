(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const absolute_path="package://RageZombies/cef/views/";class CEFBrowser{constructor(e){this._setup(e)}_setup(e){this.browser=mp.browsers.new(absolute_path+e),this.cursorState=!1,console.log("new instance")}call(){let e=Array.prototype.slice.call(arguments),t=e[0],s="(";for(let t=1;t<e.length;t++){switch(typeof e[t]){case"string":s+="'"+e[t]+"'";break;case"number":case"boolean":s+=e[t];break;case"object":s+=JSON.stringify(e[t])}t<e.length-1&&(s+=",")}t+=s+=");",this.browser.execute(t)}active(e){this.browser.active=e}get isActive(){return this.browser.active}cursor(e){this.cursorState=e,mp.gui.cursor.visible=e}clear(){this.load("empty.html")}load(e){this.browser.url=absolute_path+e}}module.exports={interface:new CEFBrowser("empty.html"),inventory:new CEFBrowser("empty.html"),hud:new CEFBrowser("empty.html"),notification:new CEFBrowser("notifications/index.html"),class:CEFBrowser};

},{}],2:[function(require,module,exports){
var Offsets=require("./object_offsets.js"),Building=new class{constructor(){this._setup()}_setup(){let e=this;e._cObj=null,e._maxDist=10,e._state=!1,mp.events.add("render",t=>e._render(t))}get busy(){return this._state}cancel(){1==this.busy&&(this._cObj.destroy(),this._cObj=null,mp.events.callRemote("Building:Canceled"),this._state=!1,mp.canCrouch=!0)}loadObject(e){this._tempModel=e;let t=mp.objects.new(mp.game.joaat(e),mp.vector(mp.players.local.position).sub(0,0,10),{alpha:255,dimension:0});t.gameObject=!0,this._cObj=t,this._state=!0}_getPlaceCoords(){let e=mp.gameplayCam.getDirection(),t=mp.gameplayCam.getCoord(),o=(mp.gameplayCam.getRot(0),new mp.Vector3(e.x*this._maxDist+t.x,e.y*this._maxDist+t.y,e.z*this._maxDist+t.z)),s=mp.raycasting.testPointToPoint(t,o,this._cObj.handle,17),l=o;return void 0!==s&&(l=mp.vector(s.position)),l}_render(){let e=this;if(e._state&&e._cObj){mp.game.controls.disableControlAction(0,22,!0),mp.game.controls.disableControlAction(0,16,!0),mp.game.controls.disableControlAction(0,17,!0),mp.game.controls.disableControlAction(0,24,!0),e._cObj.setCollision(!1,!1),e._cObj.setAlpha(150);let t=e._cObj.getRotation(0),o=e._getPlaceCoords(),s=mp.vector(o).ground2(e._cObj);mp.game.controls.isDisabledControlPressed(0,22)&&(o=s),mp.game.controls.isDisabledControlPressed(0,16)?t.z-=8:mp.game.controls.isDisabledControlPressed(0,17)&&(t.z+=8),e._cObj.setRotation(t.x,t.y,t.z,0,!0),e._cObj.setCoords(o.x,o.y,o.z,!1,!1,!1,!1),mp.game.graphics.drawText(s.dist(o)>.001?"[NOT PLACEABLE]":"[PLACEABLE]",[o.x,o.y,o.z],{font:4,color:[255,255,255,185],scale:[.25,.25],outline:!0,centre:!0}),e._renderHelp(),mp.canCrouch=!1;let l=!(s.dist(o)>.001);mp.game.controls.isDisabledControlPressed(0,24)?1==l&&e._place():mp.game.controls.isDisabledControlPressed(0,25)&&e.cancel()}}_place(){let e=this;if(e._cObj){let t=e._cObj.getRotation(0),o=e._cObj.getCoords(!1);e._cObj.destroy(),e._cObj=null;let s={model:e._tempModel,pos:{x:o.x,y:o.y,z:o.z},rot:{x:t.x,y:t.y,z:t.z}};mp.events.callRemote("Building:Place",JSON.stringify(s)),mp.canCrouch=!0}e._state=!1}_renderHelp(){mp.game.graphics.drawText("[MW DOWN] Rotate Left",[.4,.7],{font:4,color:1==mp.game.controls.isDisabledControlPressed(0,16)?[255,150,150,200]:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0}),mp.game.graphics.drawText("[MW UP] Rotate Right",[.6,.7],{font:4,color:1==mp.game.controls.isDisabledControlPressed(0,17)?[255,150,150,200]:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0}),mp.game.graphics.drawText("[LMB] Place Object",[.5,.65],{font:4,color:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0}),mp.game.graphics.drawText("[RMB] Cancel Placement",[.5,.67],{font:4,color:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0}),mp.game.graphics.drawText("[MOUSE] Change Position",[.5,.7],{font:4,color:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0}),mp.game.graphics.drawText("[SPACE] Snap to Ground",[.5,.73],{font:4,color:1==mp.game.controls.isDisabledControlPressed(0,22)?[255,150,150,200]:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0})}};mp.events.add("Building:Start",e=>{0==Building.busy&&(console.log("loading building object",e),Building.loadObject(e))}),mp.events.add("Building:Cancel",()=>{1==Building.busy&&Building.cancel()}),module.exports=Building;

},{"./object_offsets.js":19}],3:[function(require,module,exports){
var values=[];values.father=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,42,43,44],values.mother=[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,45];const appearanceIndex={blemishes:0,facial_hair:1,eyebrows:2,ageing:3,makeup:4,blush:5,complexion:6,sundamage:7,lipstick:8,freckles:9,chesthair:10};var CEFInterface=require("./browser.js").interface,CEFNotification=require("./browser.js").notification;mp.events.add("Character:Start",(e,a,l)=>{console.log("CHARACERT"),mp.localPlayer.position=new mp.Vector3(1868.5804443359375,3710.160888671875,113.74533081054688),mp.localPlayer.setAlpha(255),mp.localPlayer.freezePosition(!0),mp.localPlayer.setHeading(140),mp.defaultCam.setActive(!0),NewCam=mp.cameras.new("default",new mp.Vector3(1867.5804443359375,3708.160888671875,114.14533081054688),new mp.Vector3,40),NewCam.pointAtCoord(1868.5804443359375,3710.160888671875,113.74533081054688),NewCam.setActive(!0),mp.game.cam.renderScriptCams(!0,!1,0,!0,!1),NewCam.setActiveWithInterp(mp.defaultCam.handle,2e3,0,0),mp.defaultCam=NewCam,mp.game.ui.displayHud(!1),mp.game.ui.displayRadar(!1),setTimeout(function(){CEFInterface.load("character_creator/index.html"),CEFInterface.cursor(!0),BeginCharacterCreator()},2e3)}),mp.events.add("Character:Update",e=>{let a=mp.localPlayer.model==mp.game.joaat("mp_m_freemode_01")?"Male":"Female";if((e=JSON.parse(e)).gender!=a&&("Male"==e.gender?(mp.localPlayer.model=mp.game.joaat("mp_m_freemode_01"),mp.localPlayer.setComponentVariation(3,0,0,2),mp.localPlayer.setComponentVariation(4,102,0,2),mp.localPlayer.setComponentVariation(6,34,0,2),mp.localPlayer.setComponentVariation(8,15,0,2),mp.localPlayer.setComponentVariation(11,34,0,2),mp.localPlayer.setComponentVariation(5,40,0,2)):(mp.localPlayer.model=mp.game.joaat("mp_f_freemode_01"),mp.localPlayer.setComponentVariation(3,14,0,2),mp.localPlayer.setComponentVariation(4,110,0,2),mp.localPlayer.setComponentVariation(6,35,0,2),mp.localPlayer.setComponentVariation(8,15,0,2),mp.localPlayer.setComponentVariation(11,49,0,2),mp.localPlayer.setComponentVariation(5,40,0,2))),e.makeup){let a=appearanceIndex.makeup,l=0==e.makeup?255:e.makeup-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.makeup_opacity,0,0)}if(e.ageing){let a=appearanceIndex.ageing,l=0==e.ageing?255:e.ageing-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.ageing_opacity,0,0)}if(e.blemishes){let a=appearanceIndex.blemishes,l=0==e.blemishes?255:e.blemishes-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.blemishes_opacity,0,0)}if(e.facial_hair){let a=appearanceIndex.facial_hair,l=0==e.facial_hair?255:e.facial_hair-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.facial_hair_opacity,e.facial_hair_color,0)}if(e.eyebrows){let a=appearanceIndex.eyebrows,l=0==e.eyebrows?255:e.eyebrows-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.eyebrows_opacity,e.eyebrows_color,0)}if(e.blush){let a=appearanceIndex.blush,l=0==e.blush?255:e.blush-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.blush_opacity,e.blush_color,0)}if(e.complexion){let a=appearanceIndex.complexion,l=0==e.complexion?255:e.complexion-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.complexion_opacity,0,0)}if(e.lipstick){let a=appearanceIndex.lipstick,l=0==e.lipstick?255:e.lipstick-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.lipstick_opacity,0,0)}if(e.freckles){let a=appearanceIndex.freckles,l=0==e.freckles?255:e.freckles-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.freckles_opacity,0,0)}if(e.chesthair){let a=appearanceIndex.chesthair,l=0==e.chesthair?255:e.chesthair-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.chesthair_opacity,e.chesthair_color,0)}if(e.sundamage){let a=appearanceIndex.sundamage,l=0==e.sundamage?255:e.sundamage-1;mp.localPlayer.setHeadOverlay(a,l,.01*e.sundamage_opacity,0,0)}e.facial.forEach(function(e,a){mp.localPlayer.setFaceFeature(parseInt(e.index),.01*parseFloat(e.val))}),null!=e.hair&&(mp.localPlayer.setComponentVariation(2,e.hair,0,2),mp.localPlayer.setHairColor(e.hair_color,e.hair_highlight_color),mp.localPlayer.setEyeColor(e.eyeColor),mp.localPlayer.setHeadOverlayColor(1,1,e.facial_hair_color,0),mp.localPlayer.setHeadOverlayColor(2,1,e.eyebrows_color,0),mp.localPlayer.setHeadOverlayColor(5,2,e.blush_color,0),mp.localPlayer.setHeadOverlayColor(8,2,e.lipstick,0),mp.localPlayer.setHeadOverlayColor(10,1,e.chesthair_color,0)),null!=e.fatherIndex&&null!=e.motherIndex&&null!=e.tone&&null!=e.resemblance&&mp.localPlayer.setHeadBlendData(values.mother[e.motherIndex],values.father[e.fatherIndex],0,values.mother[e.motherIndex],values.father[e.fatherIndex],0,.01*e.resemblance,.01*e.tone,0,!1)}),mp.events.add("Character:Save",e=>{console.log("SAVE CHAR"),CEFInterface.clear(),CEFInterface.cursor(!1),CEFInterface.active(!1),clearTasksRender=!1,mp.defaultCam.setActive(!1),mp.localPlayer.freezePosition(!1),mp.game.cam.doScreenFadeOut(500),setTimeout(function(){mp.events.callRemote("Character:Save",e)},1e3)});var clearTasksRender=!1;function BeginCharacterCreator(){mp.localPlayer.model=mp.game.joaat("mp_m_freemode_01"),mp.localPlayer.setDefaultComponentVariation(),mp.localPlayer.setComponentVariation(3,0,0,2),mp.localPlayer.setComponentVariation(4,102,0,2),mp.localPlayer.setComponentVariation(6,34,0,2),mp.localPlayer.setComponentVariation(8,15,0,2),mp.localPlayer.setComponentVariation(11,34,0,2),mp.localPlayer.setComponentVariation(5,40,0,2),mp.localPlayer.setHeadBlendData(values.mother[0],values.father[0],0,values.mother[0],values.father[0],0,.5,.5,0,!1),clearTasksRender=!0}mp.events.add("render",function(){if(1==clearTasksRender){mp.localPlayer.setHeading(140),mp.localPlayer.taskLookAt(0,0,0);let e=mp.localPlayer.getBoneCoords(12844,0,0,0);mp.defaultCam.pointAtCoord(e.x,e.y,e.z),mp.defaultCam.setActive(!0)}});

},{"./browser.js":1}],4:[function(require,module,exports){
require("./vector.js");var player_bones={SKEL_L_UpperArm:{bone_id:45509,threshold:.08},SKEL_R_UpperArm:{bone_id:40269,threshold:.08},SKEL_L_Forearm:{bone_id:61163,threshold:.08},SKEL_R_Forearm:{bone_id:28252,threshold:.08},SKEL_Head:{bone_id:31086,threshold:.15},SKEL_R_Hand:{bone_id:57005,threshold:.06},SKEL_L_Hand:{bone_id:18905,threshold:.06},SKEL_R_Clavicle:{bone_id:10706,threshold:.1},SKEL_L_Clavicle:{bone_id:64729,threshold:.1},SKEL_Spine0:{bone_id:23553,threshold:.15},SKEL_Spine1:{bone_id:24816,threshold:.15},SKEL_Spine2:{bone_id:24817,threshold:.15},SKEL_Spine3:{bone_id:24818,threshold:.15},SKEL_R_Calf:{bone_id:36864,threshold:.08},SKEL_L_Calf:{bone_id:63931,threshold:.08},SKEL_L_Thigh:{bone_id:58271,threshold:.08},SKEL_R_Thigh:{bone_id:51826,threshold:.08},SKEL_R_Foot:{bone_id:52301,threshold:.08},SKEL_L_Foot:{bone_id:14201,threshold:.08}};function getVehiclePassangerEntityFromPosition(e,t){let o=[];mp.players.forEachInStreamRange(e=>{e.vehicle==t&&o.push(e)});let a={dist:9999,target:null};return o.forEach(function(t){let o=t.position,i=mp.game.system.vdist2(e.x,e.y,e.z,o.x,o.y,o.z);i<a.dist&&(a.dist=i,a.target=t)}),a}function getIsHitOnBone(e,t){let o="",a=99;if(null!=t)for(let i in player_bones){let l=player_bones[i].bone_id,r=player_bones[i].threshold,s=mp.players.local.getBoneCoords(12844,0,0,0),n=t.getBoneCoords(l,0,0,0);mp.raycasting.testPointToPoint(e,n,mp.players.local,2);if(mp.game.system.vdist(e.x,e.y,e.z,n.x,n.y,n.z)<1.6){let t=new mp.Vector3(e.x-s.x,e.y-s.y,e.z-s.z),l=mp.game.system.vdist(e.x,e.y,e.z,s.x,s.y,s.z),m=t.normalize(l),p=mp.game.system.vdist(n.x,n.y,n.z,s.x,s.y,s.z),y=m.multiply(p),d=mp.game.system.vdist(n.x,n.y,n.z,s.x+y.x,s.y+y.y,s.z+y.z);a>d&&d<=r&&(o=i,a=d)}}return{hit:""!=o,bone:o,dist:a}}var shotgunSpreadData={487013001:{spray:1.5,max_dist:30}};function getWeaponDetails(e){return shotgunSpreadData[e]?shotgunSpreadData[e]:{spray:1.5,max_dist:30}}function isWallbugging(e){let t=mp.players.local.getBoneCoords(40269,0,0,0),o=e,a=mp.raycasting.testPointToPoint(o,t,mp.players.local,19);if(a){let e=a.position,o=new mp.Vector3(e.x-t.x,e.y-t.y,e.z-t.z),i=mp.game.system.vdist(e.x,e.y,e.z,t.x,t.y,t.z),l=o.normalize(i/2).multiply(i/2),r=new mp.Vector3(e.x+l.x,e.y+l.y,e.z+l.z),s=new mp.Vector3(e.x-l.x,e.y-l.y,e.z-l.z),n=mp.raycasting.testPointToPoint(r,s,mp.players.local,19),m=mp.raycasting.testPointToPoint(s,r,mp.players.local,19);if(n&&m){return!(mp.game.system.vdist(n.position.x,n.position.y,n.position.z,m.position.x,m.position.y,m.position.z)<.45)}return!0}return!1}function calculateShotgunPelletsOnPlayers(){let e=null;var t=mp.players.local.getBoneCoords(40269,0,0,0);let o=mp.players.local.aimingAt;return mp.raycasting.testPointToPoint(o,t,mp.players.local,-1)||mp.players.forEachInStreamRange(a=>{if(mp.players.local!=a){let i=a.getWorldPositionOfBone(a.getBoneIndexByName("IK_Head"));if(!mp.raycasting.testPointToPoint(t,i,mp.players.local,-1)){let l=mp.players.local.getBoneCoords(12844,0,0,0),r=new mp.Vector3(o.x-l.x,o.y-l.y,o.z-l.z),s=mp.game.system.vdist(o.x,o.y,o.z,l.x,l.y,l.z),n=r.normalize(s),m=mp.game.system.vdist(i.x,i.y,i.z,l.x,l.y,l.z),p=n.multiply(m),y=(new mp.Vector3(l.x+p.x,l.y+p.y,l.z+p.z),mp.game.system.vdist(i.x,i.y,i.z,l.x+p.x,l.y+p.y,l.z+p.z)),d=mp.game.system.vdist(i.x,i.y,i.z,t.x,t.y,t.z),h=getWeaponDetails(Number(mp.players.local.weapon));if(h){let t=lerp(.5,h.spray,1/h.max_dist*d);t>h.spray&&(t=h.spray);let o=!1;t>y&&(o=!0),1==o&&(e=a)}}}}),e}mp.events.add("playerWeaponShot",(e,t)=>{let o=mp.players.local.weapon,a=mp.players.local.getAmmoInClip(o);if(mp.events.callRemote("Combat:FireWeapon",o.toString(),a),0==isWallbugging(e))if(t)if(t.isInAnyVehicle(!1)){let a=t.vehicle,i=getVehiclePassangerEntityFromPosition(e,a);1==getIsHitOnBone(e,i.target).hit?mp.events.callRemote("Combat:HitEntity",i.target,o):mp.events.callRemote("Combat:HitVehicle",a,o)}else mp.events.callRemote("Combat:HitEntity",t,o);else if(860033945==mp.game.weapon.getWeapontypeGroup(o)){let e=calculateShotgunPelletsOnPlayers();null!=e&&mp.events.callRemote("Combat:HitEntity",e,o)}});var timerHitmarker=0;mp.events.add("render",()=>{mp.game.player.resetStamina(),mp.game.graphics.hasStreamedTextureDictLoaded("hud_reticle")||mp.game.graphics.requestStreamedTextureDict("hud_reticle",!0),mp.game.graphics.hasStreamedTextureDictLoaded("hud_reticle")&&Date.now()/1e3-timerHitmarker<=.1&&mp.game.graphics.drawSprite("hud_reticle","reticle_ar",.5,.5,.025,.04,45,255,255,255,150)}),mp.events.add("Combat:HitEntity",()=>{timerHitmarker=Date.now()/1e3}),mp.events.add("Combat:Hitted",e=>{});

},{"./vector.js":26}],5:[function(require,module,exports){
var Status=["Crafted successfully!","Crafting failed!","Recipe not found...","Invalid Amount!"];mp.events.add("Crafting:Reply",t=>{console.log(Status[t])});

},{}],6:[function(require,module,exports){
const movementClipSet="move_ped_crouched",strafeClipSet="move_ped_crouched_strafing",clipSetSwitchTime=.25,loadClipSet=e=>{for(mp.game.streaming.requestClipSet(e);!mp.game.streaming.hasClipSetLoaded(e);)mp.game.wait(0)};loadClipSet(movementClipSet),loadClipSet(strafeClipSet),mp.events.add("entityStreamIn",e=>{"player"===e.type&&e.getVariable("isCrouched")&&(e.setMovementClipset(movementClipSet,.25),e.setStrafeClipset(strafeClipSet))}),mp.events.addDataHandler("isCrouched",(e,t)=>{"player"===e.type&&(t?(e.setMovementClipset(movementClipSet,.25),e.setStrafeClipset(strafeClipSet)):(e.resetMovementClipset(.25),e.resetStrafeClipset()))}),mp.keys.bind(17,!1,()=>{1==mp.canCrouch&&0==mp.gui.chat.enabled&&1==mp.ui.ready&&mp.events.callRemote("Player:Crouch")});

},{}],7:[function(require,module,exports){
require("./vector.js");var natives=require("./natives.js"),materials=require("./materials.js"),StorageSystem=require("./storage.js");function checkResourceInFront(e){let a={dist:e,pos:null,resource:""},t=new mp.Vector3(mp.players.local.position.x,mp.players.local.position.y,mp.players.local.position.z),r=mp.players.local.getHeading();t=t.findRot(r,.5,90);for(var l=0;l<180;l+=10){let e=t.findRot(r,5,l),o=mp.raycasting.testCapsule(t,e,.1,mp.players.local.handle,-1);if(o){e=new mp.Vector3(o.position.x,o.position.y,o.position.z);let r=t.dist(e);r<a.dist&&1==materials[o.material]&&(a.dist=r,a.pos=e,a.resource=o.material)}}return""!=a.resource&&a.resource}let addText="";mp.events.add("render",()=>{if(1==mp.ui.ready&&(1==mp.localPlayer.getVariable("hasHatchet")||1==mp.localPlayer.getVariable("hasPickaxe")))if(1==mp.localPlayer.getVariable("canGather")){let e=checkResourceInFront(.5);if(e)if(1==mp.localPlayer.getVariable("hasHatchet")&&1==materials[e]||1==mp.localPlayer.getVariable("hasPickaxe")&&2==materials[e]){if(mp.game.controls.disableControlAction(0,51,!0),mp.game.ui.showHudComponentThisFrame(14),mp.game.graphics.drawText("[E] Gather Material",[.5,.55],{font:4,color:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0}),""!=addText&&mp.game.graphics.drawText("\n["+addText+"]",[.5,.55],{font:4,color:[255,150,150,200],scale:[.3,.3],outline:!0,centre:!0}),mp.game.controls.isDisabledControlJustPressed(0,51)){StorageSystem.checkFit("inventory",2,2).then(function(a){null!=a?mp.events.callRemote("Player:Gather",e.toString()):addText="Not enough Space"})}}else addText=""}else addText=""}),module.exports=checkResourceInFront;

},{"./materials.js":16,"./natives.js":17,"./storage.js":25,"./vector.js":26}],8:[function(require,module,exports){
console.log=function(...e){mp.gui.chat.push("DEBUG:"+e.join(" "))},require("./libs/attachments.js"),require("./libs/weapon_attachments.js"),require("./libs/animations.js"),mp.attachmentMngr.register("mining","prop_tool_pickaxe",57005,new mp.Vector3(.085,-.3,0),new mp.Vector3(-90,0,0)),mp.attachmentMngr.register("lumberjack","w_me_hatchet",57005,new mp.Vector3(.085,-.05,0),new mp.Vector3(-90,0,0)),mp.rpc=require("./libs/rage-rpc.min.js"),mp.isValid=function(e){return null!=e&&null!=e&&""!=e},mp.gui.chat.enabled=!1,mp.gui.execute("const _enableChatInput = enableChatInput;enableChatInput = (enable) => { mp.trigger('chatEnabled', enable); _enableChatInput(enable) };"),mp.events.add("chatEnabled",e=>{mp.gui.chat.enabled=e}),mp.game.graphics.setBlackout(!0),mp.canCrouch=!0,mp.gameplayCam=mp.cameras.new("gameplay"),mp.defaultCam=mp.cameras.new("default"),mp.localPlayer=mp.players.local,mp.ui={},mp.ui.ready=!1,mp.gameplayCam.setAffectsAiming(!0),require("./vector.js"),require("./scaleforms/index.js"),require("./crouch.js"),require("./items.js"),require("./crafting.js"),require("./zombies.js"),require("./gathering.js"),require("./building.js"),require("./login.js"),require("./combat.js"),require("./character_creator.js"),require("./vehicles.js"),require("./storage.js"),require("./weather.js");var natives=require("./natives.js"),CEFNotification=require("./browser.js").notification;mp.events.add("Notifications:New",e=>{CEFNotification.call("notify",e)}),mp.events.add("Player:WanderDuration",e=>{console.log("GO WANDER");mp.players.local.position;mp.players.local.taskWanderStandard(10,10),setTimeout(function(){mp.players.local.clearTasksImmediately()},e)}),mp.events.add("Player:UiReady",()=>{mp.ui.ready=!0}),mp.events.add("Player:Collision",e=>{1==e?mp.vehicles.forEach(e=>{mp.players.local.vehicle&&(mp.players.local.vehicle.setNoCollision(e.handle,!0),natives.SET_ENTITY_NO_COLLISION_ENTITY(mp.players.local.vehicle,e,!0),natives.SET_ENTITY_NO_COLLISION_ENTITY(e,mp.players.local.vehicle,!0)),e.setAlpha(255)}):mp.vehicles.forEach(e=>{mp.players.local.vehicle&&(mp.players.local.vehicle.setNoCollision(e.handle,!1),natives.SET_ENTITY_NO_COLLISION_ENTITY(e,mp.players.local.vehicle,!1),natives.SET_ENTITY_NO_COLLISION_ENTITY(mp.players.local.vehicle,e,!1)),e.setAlpha(150)})});

},{"./browser.js":1,"./building.js":2,"./character_creator.js":3,"./combat.js":4,"./crafting.js":5,"./crouch.js":6,"./gathering.js":7,"./items.js":9,"./libs/animations.js":10,"./libs/attachments.js":11,"./libs/rage-rpc.min.js":12,"./libs/weapon_attachments.js":14,"./login.js":15,"./natives.js":17,"./scaleforms/index.js":24,"./storage.js":25,"./vector.js":26,"./vehicles.js":27,"./weather.js":28,"./zombies.js":29}],9:[function(require,module,exports){
var CEFNotification=require("./browser.js").notification,CEFInventory=require("./browser.js").inventory,StorageSystem=require("./storage.js"),Notifications=require("./notifications.js"),streamedPools=[];class LootPool{constructor(o){console.log("LootPool create"),this._setup(o)}_setup(o){this._lootData=o,this._pickupObjects=[],this.load()}get position(){return new mp.Vector3(this._lootData.pos.x,this._lootData.pos.y,this._lootData.pos.z)}get id(){return this._lootData.id}getLootPool(){return this._lootData.items}isInRange(){return new mp.Vector3(this._lootData.pos.x,this._lootData.pos.y,this._lootData.pos.z).dist(mp.players.local.position)<(1==mp.players.local.isRunning()?7:5)}reload(o){this.unload(this.id);let t=[];this._lootData.items.forEach(function(o,e){null!=o&&null==t[o.index]&&(t[o.index]=o.rot)}),this._lootData=o,this._lootData.items=this._lootData.items.map(function(o,e,i){let s=o;return null!=s&&(s.rot=t[e]||void 0),s}),this.load()}load(){let o=this;try{let t=new mp.Vector3(o._lootData.pos.x,o._lootData.pos.y,o._lootData.pos.z),e=45;o._lootData.items.forEach(function(i,s){if(null!=i){i.index=s;let a=t.findRot(0,.5,e*s),n=e*s+(a.rotPoint(t)+Math.floor(360*Math.random()));n>360&&(n-=360),null==i.rot&&(i.rot=n);let l=a;l.z+=1;let r=mp.objects.new(mp.game.joaat(i.model),l,{rotation:new mp.Vector3(0,0,i.rot),alpha:255,dimension:0});r.placeOnGroundProperly();let c=r.getRotation(0),m=r.getCoords(!1);r.setCollision(!1,!0),r.freezePosition(!0),r.setPhysicsParams(9e6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1),i.offset.rot.x>0||i.offset.rot.y>0?r.setCoords(m.x+i.offset.pos.x,m.y+i.offset.pos.y,m.z-r.getHeightAboveGround()+i.offset.pos.z,!1,!1,!1,!1):r.setCoords(m.x+i.offset.pos.x,m.y+i.offset.pos.y,m.z+i.offset.pos.z,!1,!1,!1,!1),r.setRotation(c.x+i.offset.rot.x,c.y+i.offset.rot.y,c.z,0,!0),o._pickupObjects.push({id:o._lootData.id,obj:r})}})}catch(o){console.log("err",o)}}unload(o){let t=this;t._pickupObjects.forEach(function(e,i){e.id==o&&(e.obj.markForDeletion(),e.obj.destroy(),delete t._pickupObjects[i])})}}function pointingAt(){direction=mp.gameplayCam.getDirection(),coords=mp.gameplayCam.getCoord();const o=new mp.Vector3(25*direction.x+coords.x,25*direction.y+coords.y,25*direction.z+coords.z),t=mp.raycasting.testPointToPoint(coords,o,mp.players.local,-1);if(void 0!==t)return t}mp.events.add("Loot:Load",(o,t)=>{streamedPools[o]||console.log("CHECK STREAM IN")}),mp.events.add("Loot:Unload",o=>{streamedPools[o]&&(streamedPools[o].unload(o),delete streamedPools[o])}),mp.events.add("Loot:Reload",(o,t)=>{streamedPools[o]&&streamedPools[o].reload(t)});let timer_anim,cStatus="",cItem=0;mp.events.add("render",()=>{let o=!1,t=999,e=null,i=pointingAt();if(Object.keys(streamedPools).forEach(function(s){let a=streamedPools[s];if(1==a.isInRange()){let n=a.position;n.z+=1,a.getLootPool().forEach(function(a,l){if(null!=a){let r,c,m=n.findRot(0,.5,45*l).ground(),p=a.thickness,d=mp.vector(mp.localPlayer.position).ground(),u=2.5*p;i&&i.position&&d.dist2d(i.position)<2&&(r=i.position),(null!=r&&m.dist(r)<=p||m.dist(d)<=u)&&(c=null!=r&&m.dist(r)<=p?m.dist(r):m.dist(d)),c&&0==o&&c<t&&(a.position=m,o=a,t=c,e=s)}})}}),o&&e){if(mp.game.controls.disableControlAction(0,51,!0),mp.game.ui.showHudComponentThisFrame(14),mp.game.graphics.drawText("[E] "+o.name,[.5,.55],{font:4,color:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0}),cItem==o&&""!=cStatus?mp.game.graphics.drawText("\n["+cStatus+"]",[.5,.55],{font:4,color:[255,150,150,200],scale:[.3,.3],outline:!0,centre:!0}):(cStatus="",cItem=o),mp.game.controls.isDisabledControlJustPressed(0,51)&&e){o.name;if(o.amount>0){StorageSystem.checkFit("inventory",o.width,o.height).then(function(t){if(null!=t){mp.events.callRemote("Loot:Pickup",e,o.index,o.name,o.amount);let t=o.position;Notifications.notify3D(t.x,t.y,t.z,t.x,t.y,t.z+.5,`+ ${o.name}`,[255,255,255]),CEFNotification.call("notify",{title:"Notification",titleSize:"16px",message:`${o.name} just got picked up`,messageColor:"rgba(50,50,50,.8)",position:"topCenter",backgroundColor:"rgba(206, 206, 206, 0.9)",close:!1}),timer_anim&&(clearTimeout(timer_anim),mp.players.local.stopAnimTask("mp_take_money_mg","stand_cash_in_bag_loop",1)),mp.players.local.taskPlayAnim("mp_take_money_mg","stand_cash_in_bag_loop",16,8,-1,49,0,!1,!1,!1),timer_anim=setTimeout(function(){mp.players.local.stopAnimTask("mp_take_money_mg","stand_cash_in_bag_loop",1)},250)}else cStatus="Not enough Space"})}}}else if(cStatus="",i&&i.entity&&"object"==typeof i.entity&&mp.vector(mp.localPlayer.position).dist(i.entity.getCoords(!0))<3&&1==i.entity.getVariable("container")&&0==i.entity.getVariable("opened")&&(mp.game.ui.showHudComponentThisFrame(14),mp.game.graphics.drawText("[E] Open Container",[.5,.55],{font:4,color:[255,255,255,200],scale:[.3,.3],outline:!0,centre:!0}),mp.game.controls.isDisabledControlJustPressed(0,51))){console.log("E Pressed");let o=i.entity.getVariable("id");console.log("entity id",o),mp.events.callRemote("Building:Interact",o)}});

},{"./browser.js":1,"./notifications.js":18,"./storage.js":25}],10:[function(require,module,exports){
var toLoad=["mp_defend_base"],loadPromises=[];toLoad.forEach(function(e){mp.game.streaming.requestAnimDict(e),loadPromises.push(new Promise((a,o)=>{let s=setInterval(()=>{mp.game.streaming.hasAnimDictLoaded(e)&&(clearInterval(s),a())},100)}))}),Promise.all(loadPromises).then(()=>{console.log("all dicts loaded")}).catch(e=>{console.log("all dicts err",e)});

},{}],11:[function(require,module,exports){
function InitAttachmentsOnJoin(){mp.players.forEach(t=>{let e=t.getVariable("attachmentsData");if(e&&e.length>0){let a=e.split("|").map(t=>parseInt(t,36));t.__attachments=a,t.__attachmentObjects={}}})}mp.attachmentMngr={attachments:{},addFor:function(t,e){if(this.attachments.hasOwnProperty(e)){if(!t.__attachmentObjects.hasOwnProperty(e)){let a=this.attachments[e],n=mp.objects.new(a.model,t.position);n.attachTo(t.handle,"string"==typeof a.boneName?t.getBoneIndexByName(a.boneName):t.getBoneIndex(a.boneName),a.offset.x,a.offset.y,a.offset.z,a.rotation.x,a.rotation.y,a.rotation.z,!1,!1,!1,!1,2,!0),t.__attachmentObjects[e]=n}}else mp.game.graphics.notify(`Static Attachments Error: ~r~Unknown Attachment Used: ~w~0x${e.toString(16)}`)},removeFor:function(t,e){if(t.__attachmentObjects.hasOwnProperty(e)){let a=t.__attachmentObjects[e];delete t.__attachmentObjects[e],mp.objects.exists(a)&&a.destroy()}},initFor:function(t){for(let e of t.__attachments)mp.attachmentMngr.addFor(t,e)},shutdownFor:function(t){for(let e in t.__attachmentObjects)mp.attachmentMngr.removeFor(t,e)},register:function(t,e,a,n,o){"string"==typeof t&&(t=mp.game.joaat(t)),console.log("register attachment id",t),"string"==typeof e&&(e=mp.game.joaat(e)),this.attachments.hasOwnProperty(t)?mp.game.graphics.notify("Static Attachments Error: ~r~Duplicate Entry"):mp.game.streaming.isModelInCdimage(e)?this.attachments[t]={id:t,model:e,offset:n,rotation:o,boneName:a}:mp.game.graphics.notify(`Static Attachments Error: ~r~Invalid Model (0x${e.toString(16)})`)},unregister:function(t){"string"==typeof t&&(t=mp.game.joaat(t)),this.attachments.hasOwnProperty(t)&&(this.attachments[t]=void 0)},addLocal:function(t){"string"==typeof t&&(t=mp.game.joaat(t));let e=mp.players.local;e.__attachments&&-1!==e.__attachments.indexOf(t)||mp.events.callRemote("staticAttachments.Add",t.toString(36))},removeLocal:function(t){"string"==typeof t&&(t=mp.game.joaat(t));let e=mp.players.local;e.__attachments&&-1!==e.__attachments.indexOf(t)&&mp.events.callRemote("staticAttachments.Remove",t.toString(36))},getAttachments:function(){return Object.assign({},this.attachments)}},mp.events.add("entityStreamIn",t=>{t.__attachments&&mp.attachmentMngr.initFor(t)}),mp.events.add("entityStreamOut",t=>{t.__attachmentObjects&&mp.attachmentMngr.shutdownFor(t)}),mp.events.addDataHandler("attachmentsData",(t,e)=>{let a=e.length>0?e.split("|").map(t=>parseInt(t,36)):[];if(console.log(JSON.stringify(a)),0!==t.handle){let e=t.__attachments;e||(e=[],t.__attachmentObjects={});for(let n of e)-1===a.indexOf(n)&&mp.attachmentMngr.removeFor(t,n);for(let n of a)-1===e.indexOf(n)&&mp.attachmentMngr.addFor(t,n)}t.__attachments=a}),InitAttachmentsOnJoin();

},{}],12:[function(require,module,exports){
!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports=r():e.rpc=r()}("undefined"!=typeof self?self:this,function(){return function(e){var r={};function n(t){if(r[t])return r[t].exports;var c=r[t]={i:t,l:!1,exports:{}};return e[t].call(c.exports,c,c.exports,n),c.l=!0,c.exports}return n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var c in e)n.d(t,c,function(r){return e[r]}.bind(null,c));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=1)}([function(e,r,n){"use strict";var t;function c(e,r){const n="client"===o();if(e&&"object"==typeof e&&void 0!==e.id){const c=(r,t,c)=>n?e.type===r&&t.at(e.id)===e:e instanceof c;switch(r){case t.Blip:return c("blip",mp.blips,mp.Blip);case t.Checkpoint:return c("checkpoint",mp.checkpoints,mp.Checkpoint);case t.Colshape:return c("colshape",mp.colshapes,mp.Colshape);case t.Label:return c("textlabel",mp.labels,mp.TextLabel);case t.Marker:return c("marker",mp.markers,mp.Marker);case t.Object:return c("object",mp.objects,mp.Object);case t.Pickup:return c("pickup",mp.pickups,mp.Pickup);case t.Player:return c("player",mp.players,mp.Player);case t.Vehicle:return c("vehicle",mp.vehicles,mp.Vehicle)}}return!1}function s(){const e=46656*Math.random()|0,r=46656*Math.random()|0;return("000"+e.toString(36)).slice(-3)+("000"+r.toString(36)).slice(-3)}function o(){return mp.joaat?"server":mp.game&&mp.game.joaat?"client":mp.trigger?"cef":void 0}function i(e){const r=o();return JSON.stringify(e,(e,n)=>{if("client"===r||"server"===r&&n&&"object"==typeof n){let e;if(c(n,t.Blip)?e=t.Blip:c(n,t.Checkpoint)?e=t.Checkpoint:c(n,t.Colshape)?e=t.Colshape:c(n,t.Marker)?e=t.Marker:c(n,t.Object)?e=t.Object:c(n,t.Pickup)?e=t.Pickup:c(n,t.Player)?e=t.Player:c(n,t.Vehicle)&&(e=t.Vehicle),e)return{__t:e,i:n.remoteId||n.id}}return n})}function a(e){const r=o();return JSON.parse(e,(e,n)=>{if(("client"===r||"server"===r)&&n&&"object"==typeof n&&"string"==typeof n.__t&&"number"==typeof n.i&&2===Object.keys(n).length){const e=n.i;let c;switch(n.__t){case t.Blip:c=mp.blips;break;case t.Checkpoint:c=mp.checkpoints;break;case t.Colshape:c=mp.colshapes;break;case t.Label:c=mp.labels;break;case t.Marker:c=mp.markers;break;case t.Object:c=mp.objects;break;case t.Pickup:c=mp.pickups;break;case t.Player:c=mp.players;break;case t.Vehicle:c=mp.vehicles}if(c)return c["client"===r?"atRemoteId":"at"](e)}return n})}function l(e){return new Promise(r=>setTimeout(()=>r(e),0))}function p(e){return new Promise((r,n)=>setTimeout(()=>n(e),0))}function u(e){try{e.url}catch(e){return!1}return!0}n.d(r,"g",function(){return s}),n.d(r,"a",function(){return o}),n.d(r,"f",function(){return i}),n.d(r,"c",function(){return a}),n.d(r,"e",function(){return l}),n.d(r,"d",function(){return p}),n.d(r,"b",function(){return u}),function(e){e.Blip="b",e.Checkpoint="cp",e.Colshape="c",e.Label="l",e.Marker="m",e.Object="o",e.Pickup="p",e.Player="pl",e.Vehicle="v"}(t||(t={}))},function(e,r,n){"use strict";n.r(r),function(e){n.d(r,"register",function(){return d}),n.d(r,"unregister",function(){return m}),n.d(r,"call",function(){return g}),n.d(r,"callServer",function(){return _}),n.d(r,"callClient",function(){return b}),n.d(r,"callBrowsers",function(){return y}),n.d(r,"callBrowser",function(){return k});var t=n(0);const c=t.a();if(!c)throw"Unknown RAGE environment";const s="PROCEDURE_NOT_FOUND",o="__rpc:id",i="__rpc:process",a="__rpc:browserRegister",l="__rpc:browserUnregister",p="cef"===c?window:e;if(!p[i])if(p.__rpcListeners={},p.__rpcPending={},p[i]=((e,r)=>{"server"!==c&&(r=e);const n=t.c(r);if(n.req){const r={id:n.id,environment:n.fenv||n.env};"server"===c&&(r.player=e);const s={ret:1,id:n.id,env:c};let o;switch(c){case"server":o=(e=>r.player.call(i,[t.f(e)]));break;case"client":if("server"===n.env)o=(e=>mp.events.callRemote(i,t.f(e)));else if("cef"===n.env){const e=n.b&&p.__rpcBrowsers[n.b];r.browser=e,o=(r=>e&&t.b(e)&&u(e,r,!0))}break;case"cef":o=(e=>mp.trigger(i,t.f(e)))}o&&f(n.name,n.args,r).then(e=>o({...s,res:e})).catch(e=>o({...s,err:e}))}else if(n.ret){const r=p.__rpcPending[n.id];if("server"===c&&r.player!==e)return;r&&(r.resolve(n.err?t.d(n.err):t.e(n.res)),delete p.__rpcPending[n.id])}}),"cef"!==c){if(mp.events.add(i,p[i]),"client"===c){d("__rpc:callServer",([e,r],n)=>h(e,r,{fenv:n.environment})),d("__rpc:callBrowsers",([e,r],n)=>w(null,e,r,{fenv:n.environment})),p.__rpcBrowsers={};const e=e=>{const r=t.g();Object.keys(p.__rpcBrowsers).forEach(r=>{const n=p.__rpcBrowsers[r];n&&t.b(n)&&n!==e||delete p.__rpcBrowsers[r]}),p.__rpcBrowsers[r]=e,e.execute(`if(typeof window['${o}'] === 'undefined'){ window['${o}'] = Promise.resolve('${r}'); }else{ window['${o}:resolve']('${r}'); }`)};mp.browsers.forEach(e),mp.events.add("browserCreated",e),p.__rpcBrowserProcedures={},mp.events.add(a,e=>{const[r,n]=JSON.parse(e);p.__rpcBrowserProcedures[n]=r}),mp.events.add(l,e=>{const[r,n]=JSON.parse(e);p.__rpcBrowserProcedures[n]===r&&delete p.__rpcBrowserProcedures[n]})}}else void 0===p[o]&&(p[o]=new Promise(e=>{p[o+":resolve"]=e}));function u(e,r,n){const c=t.f(r);e.execute(`var process = window["${i}"]; if(process){ process(${JSON.stringify(c)}); }else{ ${n?"":`mp.trigger("${i}", '{"ret":1,"id":"${r.id}","err":"${s}","env":"cef"}');`} }`)}function f(e,r,n){const c=p.__rpcListeners[e];return c?t.e(c(r,n)):t.d(s)}function d(e,r){if(2!==arguments.length)throw'register expects 2 arguments: "name" and "cb"';"cef"===c&&p[o].then(r=>mp.trigger(a,JSON.stringify([r,e]))),p.__rpcListeners[e]=r}function m(e){if(1!==arguments.length)throw'unregister expects 1 argument: "name"';"cef"===c&&p[o].then(r=>mp.trigger(l,JSON.stringify([r,e]))),p.__rpcListeners[e]=void 0}function g(e,r){return 1!==arguments.length&&2!==arguments.length?t.d('call expects 1 or 2 arguments: "name" and optional "args"'):f(e,r,{environment:c})}function h(e,r,n={}){switch(c){case"server":return g(e,r);case"client":{const s=t.g();return new Promise(o=>{p.__rpcPending[s]={resolve:o};const a={req:1,id:s,name:e,env:c,args:r,...n};mp.events.callRemote(i,t.f(a))})}case"cef":return b("__rpc:callServer",[e,r])}}function _(e,r){return 1!==arguments.length&&2!==arguments.length?t.d('callServer expects 1 or 2 arguments: "name" and optional "args"'):h(e,r,{})}function b(e,r,n){switch(c){case"client":return n=r,r=e,1!==arguments.length&&2!==arguments.length||"string"!=typeof r?t.d('callClient from the client expects 1 or 2 arguments: "name" and optional "args"'):g(r,n);case"server":{if(2!==arguments.length&&3!==arguments.length||"object"!=typeof e)return t.d('callClient from the server expects 2 or 3 arguments: "player", "name", and optional "args"');const s=t.g();return new Promise(o=>{p.__rpcPending[s]={resolve:o,player:e};const a={req:1,id:s,name:r,env:c,args:n};e.call(i,[t.f(a)])})}case"cef":{if(n=r,r=e,1!==arguments.length&&2!==arguments.length||"string"!=typeof r)return t.d('callClient from the browser expects 1 or 2 arguments: "name" and optional "args"');const s=t.g();return p[o].then(e=>new Promise(o=>{p.__rpcPending[s]={resolve:o};const a={b:e,req:1,id:s,name:r,env:c,args:n};mp.trigger(i,t.f(a))}))}}}function v(e,r,n,t,s={}){return new Promise(o=>{p.__rpcPending[e]={resolve:o},u(r,{req:1,id:e,name:n,env:c,args:t,...s},!1)})}function w(e,r,n,o={}){switch(c){case"client":const i=t.g(),a=p.__rpcBrowserProcedures[r];if(!a)return t.d(s);const l=p.__rpcBrowsers[a];return l&&t.b(l)?v(i,l,r,n,o):t.d(s);case"server":return b(e,"__rpc:callBrowsers",[r,n]);case"cef":return b("__rpc:callBrowsers",[r,n])}}function y(e,r,n){switch(c){case"client":case"cef":return 1!==arguments.length&&2!==arguments.length?t.d('callBrowsers from the client or browser expects 1 or 2 arguments: "name" and optional "args"'):w(null,e,r,{});case"server":return 2!==arguments.length&&3!==arguments.length?t.d('callBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args"'):w(e,r,n,{})}}function k(e,r,n){return"client"!==c?t.d("callBrowser can only be used in the client environment"):2!==arguments.length&&3!==arguments.length?t.d('callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args"'):v(t.g(),e,r,n,{})}}.call(this,n(2))},function(e,r){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n}])});

},{}],13:[function(require,module,exports){
module.exports={
  "2725352035": {
    "HashKey": "WEAPON_UNARMED",
    "NameGXT": "WT_UNARMED",
    "DescriptionGXT": "WTD_UNARMED",
    "Name": "Unarmed",
    "Description": "",
    "Group": "GROUP_UNARMED",
    "ModelHashKey": "",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "2578778090": {
    "HashKey": "WEAPON_KNIFE",
    "NameGXT": "WT_KNIFE",
    "DescriptionGXT": "WTD_KNIFE",
    "Name": "Knife",
    "Description": "This carbon steel 7\" bladed knife is dual edged with a serrated spine to provide improved stabbing and thrusting capabilities.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_knife_01",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "1737195953": {
    "HashKey": "WEAPON_NIGHTSTICK",
    "NameGXT": "WT_NGTSTK",
    "DescriptionGXT": "WTD_NGTSTK",
    "Name": "Nightstick",
    "Description": "24\" polycarbonate side-handled nightstick.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_nightstick",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "1317494643": {
    "HashKey": "WEAPON_HAMMER",
    "NameGXT": "WT_HAMMER",
    "DescriptionGXT": "WTD_HAMMER",
    "Name": "Hammer",
    "Description": "A robust, multi-purpose hammer with wooden handle and curved claw, this old classic still nails the competition.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_hammer",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "2508868239": {
    "HashKey": "WEAPON_BAT",
    "NameGXT": "WT_BAT",
    "DescriptionGXT": "WTD_BAT",
    "Name": "Baseball Bat",
    "Description": "Aluminum baseball bat with leather grip. Lightweight yet powerful for all you big hitters out there.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_bat",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "1141786504": {
    "HashKey": "WEAPON_GOLFCLUB",
    "NameGXT": "WT_GOLFCLUB",
    "DescriptionGXT": "WTD_GOLFCLUB",
    "Name": "Golf Club",
    "Description": "Standard length, mid iron golf club with rubber grip for a lethal short game.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_gclub",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "2227010557": {
    "HashKey": "WEAPON_CROWBAR",
    "NameGXT": "WT_CROWBAR",
    "DescriptionGXT": "WTD_CROWBAR",
    "Name": "Crowbar",
    "Description": "Heavy-duty crowbar forged from high quality, tempered steel for that extra leverage you need to get the job done.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_crowbar",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "453432689": {
    "HashKey": "WEAPON_PISTOL",
    "NameGXT": "WT_PIST",
    "DescriptionGXT": "WT_PIST_DESC",
    "Name": "Pistol",
    "Description": "Standard handgun. A .45 caliber pistol with a magazine capacity of 12 rounds that can be extended to 16.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "W_PI_PISTOL",
    "DefaultClipSize": 12,
    "Components": {
      "4275109233": {
        "HashKey": "COMPONENT_PISTOL_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_P_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Pistol.",
        "ModelHashKey": "w_pi_pistol_mag1",
        "IsDefault": true
      },
      "3978713628": {
        "HashKey": "COMPONENT_PISTOL_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_P_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Pistol.",
        "ModelHashKey": "w_pi_pistol_mag2",
        "IsDefault": false
      },
      "899381934": {
        "HashKey": "COMPONENT_AT_PI_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_flsh",
        "IsDefault": false
      },
      "1709866683": {
        "HashKey": "COMPONENT_AT_PI_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp_2",
        "IsDefault": false
      },
      "3610841222": {
        "HashKey": "COMPONENT_PISTOL_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_P",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "W_PI_Pistol_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "1593441988": {
    "HashKey": "WEAPON_COMBATPISTOL",
    "NameGXT": "WT_PIST_CBT",
    "DescriptionGXT": "WTD_PIST_CBT",
    "Name": "Combat Pistol",
    "Description": "A compact, lightweight, semi-automatic pistol designed for law enforcement and personal defense. 12-round magazine with option to extend to 16 rounds.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "W_PI_COMBATPISTOL",
    "DefaultClipSize": 12,
    "Components": {
      "119648377": {
        "HashKey": "COMPONENT_COMBATPISTOL_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CP_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Combat Pistol.",
        "ModelHashKey": "w_pi_combatpistol_mag1",
        "IsDefault": true
      },
      "3598405421": {
        "HashKey": "COMPONENT_COMBATPISTOL_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CP_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Combat Pistol.",
        "ModelHashKey": "w_pi_combatpistol_mag2",
        "IsDefault": false
      },
      "899381934": {
        "HashKey": "COMPONENT_AT_PI_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_flsh",
        "IsDefault": false
      },
      "3271853210": {
        "HashKey": "COMPONENT_AT_PI_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp",
        "IsDefault": false
      },
      "3328527730": {
        "HashKey": "COMPONENT_COMBATPISTOL_VARMOD_LOWRIDER",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_CBP",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "w_pi_combatpistol_luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "584646201": {
    "HashKey": "WEAPON_APPISTOL",
    "NameGXT": "WT_PIST_AP",
    "DescriptionGXT": "WTD_PIST_AP",
    "Name": "AP Pistol",
    "Description": "High-penetration, fully-automatic pistol. Holds 18 rounds in magazine with option to extend to 36 rounds.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "W_PI_APPISTOL",
    "DefaultClipSize": 18,
    "Components": {
      "834974250": {
        "HashKey": "COMPONENT_APPISTOL_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_AP_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for AP Pistol.",
        "ModelHashKey": "w_pi_appistol_mag1",
        "IsDefault": true
      },
      "614078421": {
        "HashKey": "COMPONENT_APPISTOL_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_AP_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for AP Pistol.",
        "ModelHashKey": "w_pi_appistol_mag2",
        "IsDefault": false
      },
      "899381934": {
        "HashKey": "COMPONENT_AT_PI_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_flsh",
        "IsDefault": false
      },
      "3271853210": {
        "HashKey": "COMPONENT_AT_PI_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp",
        "IsDefault": false
      },
      "2608252716": {
        "HashKey": "COMPONENT_APPISTOL_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_METAL",
        "DescriptionGXT": "WCD_VAR_AP",
        "Name": "Gilded Gun Metal Finish",
        "Description": "",
        "ModelHashKey": "W_PI_APPistol_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2578377531": {
    "HashKey": "WEAPON_PISTOL50",
    "NameGXT": "WT_PIST_50",
    "DescriptionGXT": "WTD_PIST_50",
    "Name": "Pistol .50",
    "Description": "High-impact pistol that delivers immense power but with extremely strong recoil. Holds 9 rounds in magazine.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "W_PI_PISTOL50",
    "DefaultClipSize": 9,
    "Components": {
      "580369945": {
        "HashKey": "COMPONENT_PISTOL50_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_P50_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Pistol .50.",
        "ModelHashKey": "W_PI_PISTOL50_Mag1",
        "IsDefault": true
      },
      "3654528146": {
        "HashKey": "COMPONENT_PISTOL50_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_P50_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Pistol .50.",
        "ModelHashKey": "W_PI_PISTOL50_Mag2",
        "IsDefault": false
      },
      "899381934": {
        "HashKey": "COMPONENT_AT_PI_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_flsh",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "2008591151": {
        "HashKey": "COMPONENT_PISTOL50_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_SIL",
        "DescriptionGXT": "WCD_VAR_P50",
        "Name": "Platinum Pearl Deluxe Finish",
        "Description": "",
        "ModelHashKey": "W_PI_Pistol50_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "324215364": {
    "HashKey": "WEAPON_MICROSMG",
    "NameGXT": "WT_SMG_MCR",
    "DescriptionGXT": "WTD_SMG_MCR",
    "Name": "Micro SMG",
    "Description": "Combines compact design with a high rate of fire at approximately 700-900 rounds per minute.",
    "Group": "GROUP_SMG",
    "ModelHashKey": "w_sb_microsmg",
    "DefaultClipSize": 16,
    "Components": {
      "3410538224": {
        "HashKey": "COMPONENT_MICROSMG_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCDMSMG_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Micro SMG.",
        "ModelHashKey": "w_sb_microsmg_mag1",
        "IsDefault": true
      },
      "283556395": {
        "HashKey": "COMPONENT_MICROSMG_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCDMSMG_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Micro SMG.",
        "ModelHashKey": "w_sb_microsmg_mag2",
        "IsDefault": false
      },
      "899381934": {
        "HashKey": "COMPONENT_AT_PI_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_flsh",
        "IsDefault": false
      },
      "2637152041": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO",
        "NameGXT": "WCT_SCOPE_MAC",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "1215999497": {
        "HashKey": "COMPONENT_MICROSMG_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_MSMG",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "W_SB_MicroSMG_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "736523883": {
    "HashKey": "WEAPON_SMG",
    "NameGXT": "WT_SMG",
    "DescriptionGXT": "WTD_SMG",
    "Name": "SMG",
    "Description": "This is known as a good all-round submachine gun. Lightweight with an accurate sight and 30-round magazine capacity.",
    "Group": "GROUP_SMG",
    "ModelHashKey": "w_sb_smg",
    "DefaultClipSize": 30,
    "Components": {
      "643254679": {
        "HashKey": "COMPONENT_SMG_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_SMG_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for SMG.",
        "ModelHashKey": "w_sb_smg_mag1",
        "IsDefault": true
      },
      "889808635": {
        "HashKey": "COMPONENT_SMG_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_SMG_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for SMG.",
        "ModelHashKey": "w_sb_smg_mag2",
        "IsDefault": false
      },
      "2043113590": {
        "HashKey": "COMPONENT_SMG_CLIP_03",
        "NameGXT": "WCT_CLIP_DRM",
        "DescriptionGXT": "WCD_CLIP3",
        "Name": "Drum Magazine",
        "Description": "Expanded capacity and slower reload.",
        "ModelHashKey": "w_sb_smg_boxmag",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "1019656791": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO_02",
        "NameGXT": "WCT_SCOPE_MAC",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro_2",
        "IsDefault": false
      },
      "3271853210": {
        "HashKey": "COMPONENT_AT_PI_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp",
        "IsDefault": false
      },
      "663170192": {
        "HashKey": "COMPONENT_SMG_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_SMG",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "W_SB_SMG_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "4024951519": {
    "HashKey": "WEAPON_ASSAULTSMG",
    "NameGXT": "WT_SMG_ASL",
    "DescriptionGXT": "WTD_SMG_ASL",
    "Name": "Assault SMG",
    "Description": "A high-capacity submachine gun that is both compact and lightweight. Holds up to 30 bullets in one magazine.",
    "Group": "GROUP_SMG",
    "ModelHashKey": "w_sb_assaultsmg",
    "DefaultClipSize": 30,
    "Components": {
      "2366834608": {
        "HashKey": "COMPONENT_ASSAULTSMG_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Default Clip",
        "Description": "",
        "ModelHashKey": "W_SB_ASSAULTSMG_Mag1",
        "IsDefault": true
      },
      "3141985303": {
        "HashKey": "COMPONENT_ASSAULTSMG_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Extended Clip",
        "Description": "",
        "ModelHashKey": "W_SB_ASSAULTSMG_Mag2",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2637152041": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO",
        "NameGXT": "WCT_SCOPE_MAC",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "663517359": {
        "HashKey": "COMPONENT_ASSAULTSMG_VARMOD_LOWRIDER",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_ASMG",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "w_sb_assaultsmg_luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "3220176749": {
    "HashKey": "WEAPON_ASSAULTRIFLE",
    "NameGXT": "WT_RIFLE_ASL",
    "DescriptionGXT": "WTD_RIFLE_ASL",
    "Name": "Assault Rifle",
    "Description": "This standard assault rifle boasts a large capacity magazine and long distance accuracy.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "W_AR_ASSAULTRIFLE",
    "DefaultClipSize": 30,
    "Components": {
      "3193891350": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_AR_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Assault Rifle.",
        "ModelHashKey": "w_ar_assaultrifle_mag1",
        "IsDefault": true
      },
      "2971750299": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_AR_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Assault Rifle.",
        "ModelHashKey": "w_ar_assaultrifle_mag2",
        "IsDefault": false
      },
      "3689981245": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_CLIP_03",
        "NameGXT": "WCT_CLIP_DRM",
        "DescriptionGXT": "WCD_CLIP3",
        "Name": "Drum Magazine",
        "Description": "Expanded capacity and slower reload.",
        "ModelHashKey": "w_ar_assaultrifle_boxmag",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2637152041": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO",
        "NameGXT": "WCT_SCOPE_MAC",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      },
      "1319990579": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_AR",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "W_AR_AssaultRifle_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2210333304": {
    "HashKey": "WEAPON_CARBINERIFLE",
    "NameGXT": "WT_RIFLE_CBN",
    "DescriptionGXT": "WTD_RIFLE_CBN",
    "Name": "Carbine Rifle",
    "Description": "Combining long distance accuracy with a high-capacity magazine, the carbine rifle can be relied on to make the hit.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "W_AR_CARBINERIFLE",
    "DefaultClipSize": 30,
    "Components": {
      "2680042476": {
        "HashKey": "COMPONENT_CARBINERIFLE_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CR_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Carbine Rifle.",
        "ModelHashKey": "w_ar_carbinerifle_mag1",
        "IsDefault": true
      },
      "2433783441": {
        "HashKey": "COMPONENT_CARBINERIFLE_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CR_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Carbine Rifle.",
        "ModelHashKey": "w_ar_carbinerifle_mag2",
        "IsDefault": false
      },
      "3127044405": {
        "HashKey": "COMPONENT_CARBINERIFLE_CLIP_03",
        "NameGXT": "WCT_CLIP_BOX",
        "DescriptionGXT": "WCD_CLIP3",
        "Name": "Box Magazine",
        "Description": "Expanded capacity and slower reload.",
        "ModelHashKey": "w_ar_carbinerifle_boxmag",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "1967214384": {
        "HashKey": "COMPONENT_AT_RAILCOVER_01",
        "NameGXT": "WCT_RAIL",
        "DescriptionGXT": "WCD_AT_RAIL",
        "Name": "",
        "Description": "",
        "ModelHashKey": "w_at_railcover_01",
        "IsDefault": false
      },
      "2698550338": {
        "HashKey": "COMPONENT_AT_SCOPE_MEDIUM",
        "NameGXT": "WCT_SCOPE_MED",
        "DescriptionGXT": "WCD_SCOPE_MED",
        "Name": "Scope",
        "Description": "Extended-range zoom functionality.",
        "ModelHashKey": "w_at_scope_medium",
        "IsDefault": false
      },
      "2205435306": {
        "HashKey": "COMPONENT_AT_AR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      },
      "3634075224": {
        "HashKey": "COMPONENT_CARBINERIFLE_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_CR",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "W_AR_CarbineRifle_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2937143193": {
    "HashKey": "WEAPON_ADVANCEDRIFLE",
    "NameGXT": "WT_RIFLE_ADV",
    "DescriptionGXT": "WTD_RIFLE_ADV",
    "Name": "Advanced Rifle",
    "Description": "The most lightweight and compact of all assault rifles, without compromising accuracy and rate of fire.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "W_AR_ADVANCEDRIFLE",
    "DefaultClipSize": 30,
    "Components": {
      "4203716879": {
        "HashKey": "COMPONENT_ADVANCEDRIFLE_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_AR_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Assault Rifle.",
        "ModelHashKey": "w_ar_advancedrifle_mag1",
        "IsDefault": true
      },
      "2395064697": {
        "HashKey": "COMPONENT_ADVANCEDRIFLE_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_AR_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Assault Rifle.",
        "ModelHashKey": "w_ar_advancedrifle_mag2",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2855028148": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL",
        "NameGXT": "WCT_SCOPE_SML",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small",
        "IsDefault": false
      },
      "2205435306": {
        "HashKey": "COMPONENT_AT_AR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp",
        "IsDefault": false
      },
      "930927479": {
        "HashKey": "COMPONENT_ADVANCEDRIFLE_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_METAL",
        "DescriptionGXT": "WCD_VAR_ADR",
        "Name": "Gilded Gun Metal Finish",
        "Description": "",
        "ModelHashKey": "W_AR_AdvancedRifle_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2634544996": {
    "HashKey": "WEAPON_MG",
    "NameGXT": "WT_MG",
    "DescriptionGXT": "WTD_MG",
    "Name": "MG",
    "Description": "General purpose machine gun that combines rugged design with dependable performance. Long range penetrative power. Very effective against large groups.",
    "Group": "GROUP_MG",
    "ModelHashKey": "w_mg_mg",
    "DefaultClipSize": 54,
    "Components": {
      "4097109892": {
        "HashKey": "COMPONENT_MG_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_MG_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for MG.",
        "ModelHashKey": "w_mg_mg_mag1",
        "IsDefault": true
      },
      "2182449991": {
        "HashKey": "COMPONENT_MG_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_MG_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for MG.",
        "ModelHashKey": "w_mg_mg_mag2",
        "IsDefault": false
      },
      "1006677997": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL_02",
        "NameGXT": "WCT_SCOPE_SML",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small_2",
        "IsDefault": false
      },
      "3604658878": {
        "HashKey": "COMPONENT_MG_VARMOD_LOWRIDER",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_MG",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "w_mg_mg_luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2144741730": {
    "HashKey": "WEAPON_COMBATMG",
    "NameGXT": "WT_MG_CBT",
    "DescriptionGXT": "WTD_MG_CBT",
    "Name": "Combat MG",
    "Description": "Lightweight, compact machine gun that combines excellent maneuverability with a high rate of fire to devastating effect.",
    "Group": "GROUP_MG",
    "ModelHashKey": "w_mg_combatmg",
    "DefaultClipSize": 100,
    "Components": {
      "3791631178": {
        "HashKey": "COMPONENT_COMBATMG_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCDCMG_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Combat MG.",
        "ModelHashKey": "w_mg_combatmg_mag1",
        "IsDefault": true
      },
      "3603274966": {
        "HashKey": "COMPONENT_COMBATMG_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCDCMG_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Combat MG.",
        "ModelHashKey": "w_mg_combatmg_mag2",
        "IsDefault": false
      },
      "2698550338": {
        "HashKey": "COMPONENT_AT_SCOPE_MEDIUM",
        "NameGXT": "WCT_SCOPE_MED",
        "DescriptionGXT": "WCD_SCOPE_MED",
        "Name": "Scope",
        "Description": "Extended-range zoom functionality.",
        "ModelHashKey": "w_at_scope_medium",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      },
      "2466172125": {
        "HashKey": "COMPONENT_COMBATMG_VARMOD_LOWRIDER",
        "NameGXT": "WCT_VAR_ETCHM",
        "DescriptionGXT": "WCD_VAR_CBMG",
        "Name": "Etched Gun Metal Finish",
        "Description": "",
        "ModelHashKey": "w_mg_combatmg_luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "487013001": {
    "HashKey": "WEAPON_PUMPSHOTGUN",
    "NameGXT": "WT_SG_PMP",
    "DescriptionGXT": "WTD_SG_PMP",
    "Name": "Pump Shotgun",
    "Description": "Standard shotgun ideal for short-range combat. A high-projectile spread makes up for its lower accuracy at long range.",
    "Group": "GROUP_SHOTGUN",
    "ModelHashKey": "w_sg_pumpshotgun",
    "DefaultClipSize": 8,
    "Components": {
      "3513717816": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "",
        "IsDefault": true
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "3859329886": {
        "HashKey": "COMPONENT_AT_SR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_SR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_sr_supp_2",
        "IsDefault": false
      },
      "2732039643": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_VARMOD_LOWRIDER",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_PSHT",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgun_luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2017895192": {
    "HashKey": "WEAPON_SAWNOFFSHOTGUN",
    "NameGXT": "WT_SG_SOF",
    "DescriptionGXT": "WTD_SG_SOF",
    "Name": "Sawed-Off Shotgun",
    "Description": "This single-barrel, sawed-off shotgun compensates for its low range and ammo capacity with devastating efficiency in close combat.",
    "Group": "GROUP_SHOTGUN",
    "ModelHashKey": "w_sg_sawnoff",
    "DefaultClipSize": 8,
    "Components": {
      "3352699429": {
        "HashKey": "COMPONENT_SAWNOFFSHOTGUN_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "",
        "IsDefault": true
      },
      "2242268665": {
        "HashKey": "COMPONENT_SAWNOFFSHOTGUN_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_METAL",
        "DescriptionGXT": "WCD_VAR_SOF",
        "Name": "Gilded Gun Metal Finish",
        "Description": "",
        "ModelHashKey": "W_SG_Sawnoff_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "3800352039": {
    "HashKey": "WEAPON_ASSAULTSHOTGUN",
    "NameGXT": "WT_SG_ASL",
    "DescriptionGXT": "WTD_SG_ASL",
    "Name": "Assault Shotgun",
    "Description": "Fully automatic shotgun with 8 round magazine and high rate of fire.",
    "Group": "GROUP_SHOTGUN",
    "ModelHashKey": "w_sg_assaultshotgun",
    "DefaultClipSize": 8,
    "Components": {
      "2498239431": {
        "HashKey": "COMPONENT_ASSAULTSHOTGUN_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_AS_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Assault Shotgun.",
        "ModelHashKey": "w_sg_assaultshotgun_mag1",
        "IsDefault": true
      },
      "2260565874": {
        "HashKey": "COMPONENT_ASSAULTSHOTGUN_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_AS_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Assault Shotgun.",
        "ModelHashKey": "w_sg_assaultshotgun_mag2",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2205435306": {
        "HashKey": "COMPONENT_AT_AR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2640438543": {
    "HashKey": "WEAPON_BULLPUPSHOTGUN",
    "NameGXT": "WT_SG_BLP",
    "DescriptionGXT": "WTD_SG_BLP",
    "Name": "Bullpup Shotgun",
    "Description": "More than makes up for its slow, pump-action rate of fire with its range and spread.  Decimates anything in its projectile path.",
    "Group": "GROUP_SHOTGUN",
    "ModelHashKey": "w_sg_bullpupshotgun",
    "DefaultClipSize": 14,
    "Components": {
      "3377353998": {
        "HashKey": "COMPONENT_BULLPUPSHOTGUN_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "",
        "IsDefault": true
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "911657153": {
    "HashKey": "WEAPON_STUNGUN",
    "NameGXT": "WT_STUN",
    "DescriptionGXT": "WTD_STUN",
    "Name": "Stun Gun",
    "Description": "Fires a projectile that administers a voltage capable of temporarily stunning an assailant. Takes approximately 4 seconds to recharge after firing.",
    "Group": "GROUP_STUNGUN",
    "ModelHashKey": "w_pi_stungun",
    "DefaultClipSize": 2104529083,
    "Components": {},
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "100416529": {
    "HashKey": "WEAPON_SNIPERRIFLE",
    "NameGXT": "WT_SNIP_RIF",
    "DescriptionGXT": "WTD_SNIP_RIF",
    "Name": "Sniper Rifle",
    "Description": "Standard sniper rifle. Ideal for situations that require accuracy at long range. Limitations include slow reload speed and very low rate of fire.",
    "Group": "GROUP_SNIPER",
    "ModelHashKey": "w_sr_sniperrifle",
    "DefaultClipSize": 10,
    "Components": {
      "2613461129": {
        "HashKey": "COMPONENT_SNIPERRIFLE_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_SR_CLIP1",
        "Name": "Default Clip",
        "Description": "",
        "ModelHashKey": "w_sr_sniperrifle_mag1",
        "IsDefault": true
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "3527687644": {
        "HashKey": "COMPONENT_AT_SCOPE_LARGE",
        "NameGXT": "WCT_SCOPE_LRG",
        "DescriptionGXT": "WCD_SCOPE_LRG",
        "Name": "Scope",
        "Description": "Long-range zoom functionality.",
        "ModelHashKey": "w_at_scope_large",
        "IsDefault": true
      },
      "3159677559": {
        "HashKey": "COMPONENT_AT_SCOPE_MAX",
        "NameGXT": "WCT_SCOPE_MAX",
        "DescriptionGXT": "WCD_SCOPE_MAX",
        "Name": "Advanced Scope",
        "Description": "Maximum zoom functionality.",
        "ModelHashKey": "w_at_scope_max",
        "IsDefault": true
      },
      "1077065191": {
        "HashKey": "COMPONENT_SNIPERRIFLE_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_WOOD",
        "DescriptionGXT": "WCD_VAR_SNP",
        "Name": "Etched Wood Grip Finish",
        "Description": "",
        "ModelHashKey": "W_SR_SniperRifle_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "205991906": {
    "HashKey": "WEAPON_HEAVYSNIPER",
    "NameGXT": "WT_SNIP_HVY",
    "DescriptionGXT": "WTD_SNIP_HVY",
    "Name": "Heavy Sniper",
    "Description": "Features armor-piercing rounds for heavy damage. Comes with laser scope as standard.",
    "Group": "GROUP_SNIPER",
    "ModelHashKey": "w_sr_heavysniper",
    "DefaultClipSize": 6,
    "Components": {
      "1198478068": {
        "HashKey": "COMPONENT_HEAVYSNIPER_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_HS_CLIP1",
        "Name": "Default Clip",
        "Description": "",
        "ModelHashKey": "w_sr_heavysniper_mag1",
        "IsDefault": true
      },
      "3527687644": {
        "HashKey": "COMPONENT_AT_SCOPE_LARGE",
        "NameGXT": "WCT_SCOPE_LRG",
        "DescriptionGXT": "WCD_SCOPE_LRG",
        "Name": "Scope",
        "Description": "Long-range zoom functionality.",
        "ModelHashKey": "w_at_scope_large",
        "IsDefault": true
      },
      "3159677559": {
        "HashKey": "COMPONENT_AT_SCOPE_MAX",
        "NameGXT": "WCT_SCOPE_MAX",
        "DescriptionGXT": "WCD_SCOPE_MAX",
        "Name": "Advanced Scope",
        "Description": "Maximum zoom functionality.",
        "ModelHashKey": "w_at_scope_max",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2726580491": {
    "HashKey": "WEAPON_GRENADELAUNCHER",
    "NameGXT": "WT_GL",
    "DescriptionGXT": "WTD_GL",
    "Name": "Grenade Launcher",
    "Description": "A compact, lightweight grenade launcher with semi-automatic functionality. Holds up to 10 rounds.",
    "Group": "GROUP_HEAVY",
    "ModelHashKey": "w_lr_grenadelauncher",
    "DefaultClipSize": 10,
    "Components": {
      "296639639": {
        "HashKey": "COMPONENT_GRENADELAUNCHER_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "w_lr_40mm",
        "IsDefault": true
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      },
      "2855028148": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL",
        "NameGXT": "WCT_SCOPE_SML",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2982836145": {
    "HashKey": "WEAPON_RPG",
    "NameGXT": "WT_RPG",
    "DescriptionGXT": "WTD_RPG",
    "Name": "RPG",
    "Description": "A portable, shoulder-launched, anti-tank weapon that fires explosive warheads. Very effective for taking down vehicles or large groups of assailants.",
    "Group": "GROUP_HEAVY",
    "ModelHashKey": "w_lr_rpg",
    "DefaultClipSize": 1,
    "Components": {
      "1319465907": {
        "HashKey": "COMPONENT_RPG_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "1119849093": {
    "HashKey": "WEAPON_MINIGUN",
    "NameGXT": "WT_MINIGUN",
    "DescriptionGXT": "WTD_MINIGUN",
    "Name": "Minigun",
    "Description": "A devastating 6-barrel machine gun that features Gatling-style rotating barrels. Very high rate of fire (2000 to 6000 rounds per minute).",
    "Group": "GROUP_HEAVY",
    "ModelHashKey": "w_mg_minigun",
    "DefaultClipSize": 15000,
    "Components": {
      "3370020614": {
        "HashKey": "COMPONENT_MINIGUN_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "2481070269": {
    "HashKey": "WEAPON_GRENADE",
    "NameGXT": "WT_GNADE",
    "DescriptionGXT": "WTD_GNADE",
    "Name": "Grenade",
    "Description": "Standard fragmentation grenade. Pull pin, throw, then find cover. Ideal for eliminating clustered assailants.",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_ex_grenadefrag",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "741814745": {
    "HashKey": "WEAPON_STICKYBOMB",
    "NameGXT": "WT_GNADE_STK",
    "DescriptionGXT": "WTD_GNADE_STK",
    "Name": "Sticky Bomb",
    "Description": "A plastic explosive charge fitted with a remote detonator. Can be thrown and then detonated or attached to a vehicle then detonated.",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_ex_pe",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "4256991824": {
    "HashKey": "WEAPON_SMOKEGRENADE",
    "NameGXT": "WT_GNADE_SMK",
    "DescriptionGXT": "WTD_GNADE_SMK",
    "Name": "Tear Gas",
    "Description": "Tear gas grenade, particularly effective at incapacitating multiple assailants. Sustained exposure can be lethal.",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_ex_grenadesmoke",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "2694266206": {
    "HashKey": "WEAPON_BZGAS",
    "NameGXT": "WT_BZGAS",
    "DescriptionGXT": "WTD_BZGAS",
    "Name": "BZ Gas",
    "Description": "",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_ex_grenadesmoke",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "615608432": {
    "HashKey": "WEAPON_MOLOTOV",
    "NameGXT": "WT_MOLOTOV",
    "DescriptionGXT": "WTD_MOLOTOV",
    "Name": "Molotov",
    "Description": "Crude yet highly effective incendiary weapon. No happy hour with this cocktail.",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_ex_molotov",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "101631238": {
    "HashKey": "WEAPON_FIREEXTINGUISHER",
    "NameGXT": "WT_FIRE",
    "DescriptionGXT": "WTD_FIRE",
    "Name": "Fire Extinguisher",
    "Description": "",
    "Group": "GROUP_FIREEXTINGUISHER",
    "ModelHashKey": "w_am_fire_exting",
    "DefaultClipSize": 2000,
    "Components": {},
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "883325847": {
    "HashKey": "WEAPON_PETROLCAN",
    "NameGXT": "WT_PETROL",
    "DescriptionGXT": "WTD_PETROL",
    "Name": "Jerry Can",
    "Description": "Leaves a trail of gasoline that can be ignited.",
    "Group": "GROUP_PETROLCAN",
    "ModelHashKey": "w_am_jerrycan",
    "DefaultClipSize": 4500,
    "Components": {},
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "core"
  },
  "600439132": {
    "HashKey": "WEAPON_BALL",
    "NameGXT": "WT_BALL",
    "DescriptionGXT": "WTD_BALL",
    "Name": "Ball",
    "Description": "",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_am_baseball",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "1233104067": {
    "HashKey": "WEAPON_FLARE",
    "NameGXT": "WT_FLARE",
    "DescriptionGXT": "WTD_FLARE",
    "Name": "Flare",
    "Description": "",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_am_flare",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "core"
  },
  "3249783761": {
    "HashKey": "WEAPON_REVOLVER",
    "NameGXT": "WT_REVOLVER",
    "DescriptionGXT": "WTD_REVOLVER",
    "Name": "Heavy Revolver",
    "Description": "A handgun with enough stopping power to drop a crazed rhino, and heavy enough to beat it to death if you're out of ammo. Part of Executives and Other Criminals.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_revolver",
    "DefaultClipSize": 6,
    "Components": {
      "384708672": {
        "HashKey": "COMPONENT_REVOLVER_VARMOD_BOSS",
        "NameGXT": "WCT_REV_VARB",
        "DescriptionGXT": "WCD_REV_VARB",
        "Name": "VIP Variant",
        "Description": "",
        "ModelHashKey": "w_pi_revolver_b",
        "IsDefault": false
      },
      "2492708877": {
        "HashKey": "COMPONENT_REVOLVER_VARMOD_GOON",
        "NameGXT": "WCT_REV_VARG",
        "DescriptionGXT": "WCD_REV_VARG",
        "Name": "Bodyguard Variant",
        "Description": "",
        "ModelHashKey": "w_pi_revolver_g",
        "IsDefault": false
      },
      "3917905123": {
        "HashKey": "COMPONENT_REVOLVER_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_REV_CLIP1",
        "Name": "Default Clip",
        "Description": "",
        "ModelHashKey": "w_pi_revolver_Mag1",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpapartment"
  },
  "3756226112": {
    "HashKey": "WEAPON_SWITCHBLADE",
    "NameGXT": "WT_SWBLADE",
    "DescriptionGXT": "WTD_SWBLADE",
    "Name": "Switchblade",
    "Description": "From your pocket to hilt-deep in the other guy's ribs in under a second: folding knives will never go out of style. Part of Executives and Other Criminals.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_switchblade",
    "DefaultClipSize": 0,
    "Components": {
      "2436343040": {
        "HashKey": "COMPONENT_SWITCHBLADE_VARMOD_BASE",
        "NameGXT": "WCT_SB_BASE",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "Default Handle",
        "Description": "",
        "ModelHashKey": "w_me_switchblade",
        "IsDefault": false
      },
      "1530822070": {
        "HashKey": "COMPONENT_SWITCHBLADE_VARMOD_VAR1",
        "NameGXT": "WCT_SB_VAR1",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "VIP Variant",
        "Description": "",
        "ModelHashKey": "w_me_switchblade_b",
        "IsDefault": false
      },
      "3885209186": {
        "HashKey": "COMPONENT_SWITCHBLADE_VARMOD_VAR2",
        "NameGXT": "WCT_SB_VAR2",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "Bodyguard Variant",
        "Description": "",
        "ModelHashKey": "w_me_switchblade_g",
        "IsDefault": false
      }
    },
    "Tints": [],
    "DLC": "mpapartment"
  },
  "940833800": {
    "HashKey": "WEAPON_STONE_HATCHET",
    "NameGXT": "WT_SHATCHET",
    "DescriptionGXT": "WTD_SHATCHET",
    "Name": "Stone Hatchet",
    "Description": "There's retro, there's vintage, and there's this. After 500 years of technological development and spiritual apocalypse, pre-Colombian chic is back.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_stonehatchet",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "mpbattle"
  },
  "4192643659": {
    "HashKey": "WEAPON_BOTTLE",
    "NameGXT": "WT_BOTTLE",
    "DescriptionGXT": "WTD_BOTTLE",
    "Name": "Bottle",
    "Description": "It's not clever and it's not pretty but, most of the time, neither is the guy coming at you with a knife. When all else fails, this gets the job done. Part of the Beach Bum Pack.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_bottle",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "mpbeach"
  },
  "3218215474": {
    "HashKey": "WEAPON_SNSPISTOL",
    "NameGXT": "WT_SNSPISTOL",
    "DescriptionGXT": "WTD_SNSPISTOL",
    "Name": "SNS Pistol",
    "Description": "Like condoms or hairspray, this fits in your pocket for a night out in a Vinewood club. It's half as accurate as a champagne cork but twice as deadly. Part of the Beach Bum Pack.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_sns_pistol",
    "DefaultClipSize": 6,
    "Components": {
      "4169150169": {
        "HashKey": "COMPONENT_SNSPISTOL_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_SNSP_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for SNS Pistol.",
        "ModelHashKey": "w_pi_sns_pistol_mag1",
        "IsDefault": true
      },
      "2063610803": {
        "HashKey": "COMPONENT_SNSPISTOL_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_SNSP_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for SNS Pistol.",
        "ModelHashKey": "w_pi_sns_pistol_mag2",
        "IsDefault": false
      },
      "2150886575": {
        "HashKey": "COMPONENT_SNSPISTOL_VARMOD_LOWRIDER",
        "NameGXT": "WCT_VAR_WOOD",
        "DescriptionGXT": "WCD_VAR_SNS",
        "Name": "Etched Wood Grip Finish",
        "Description": "",
        "ModelHashKey": "w_pi_sns_pistol_luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpbeach"
  },
  "317205821": {
    "HashKey": "WEAPON_AUTOSHOTGUN",
    "NameGXT": "WT_AUTOSHGN",
    "DescriptionGXT": "WTD_AUTOSHGN",
    "Name": "Sweeper Shotgun",
    "Description": "How many effective tools for riot control can you tuck into your pants? OK, two. But this is the other one. Part of Bikers.",
    "Group": "GROUP_SHOTGUN",
    "ModelHashKey": "w_sg_sweeper",
    "DefaultClipSize": 10,
    "Components": {
      "169463950": {
        "HashKey": "COMPONENT_AUTOSHOTGUN_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "",
        "Name": "Default Clip",
        "Description": "",
        "ModelHashKey": "w_sg_sweeper_mag1",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpbiker"
  },
  "3441901897": {
    "HashKey": "WEAPON_BATTLEAXE",
    "NameGXT": "WT_BATTLEAXE",
    "DescriptionGXT": "WTD_BATTLEAXE",
    "Name": "Battle Axe",
    "Description": "If it's good enough for medieval foot soldiers, modern border guards and pushy soccer moms, it's good enough for you. Part of Bikers.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_battleaxe",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "mpbiker"
  },
  "125959754": {
    "HashKey": "WEAPON_COMPACTLAUNCHER",
    "NameGXT": "WT_CMPGL",
    "DescriptionGXT": "WTD_CMPGL",
    "Name": "Compact Grenade Launcher",
    "Description": "Focus groups using the regular model suggested it was too accurate and found it awkward to use with one hand on the throttle. Easy fix. Part of Bikers.",
    "Group": "GROUP_HEAVY",
    "ModelHashKey": "w_lr_compactgl",
    "DefaultClipSize": 1,
    "Components": {
      "1235472140": {
        "HashKey": "COMPONENT_COMPACTLAUNCHER_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "",
        "Name": "Default Clip",
        "Description": "",
        "ModelHashKey": "w_lr_compactgl_mag1",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpbiker"
  },
  "3173288789": {
    "HashKey": "WEAPON_MINISMG",
    "NameGXT": "WT_MINISMG",
    "DescriptionGXT": "WTD_MINISMG",
    "Name": "Mini SMG",
    "Description": "Increasingly popular since the marketing team looked beyond spec ops units and started caring about the little guys in low income areas. Part of Bikers.",
    "Group": "GROUP_SMG",
    "ModelHashKey": "w_sb_minismg",
    "DefaultClipSize": 20,
    "Components": {
      "2227745491": {
        "HashKey": "COMPONENT_MINISMG_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_MIMG_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Mini SMG.",
        "ModelHashKey": "w_sb_minismg_mag1",
        "IsDefault": true
      },
      "2474561719": {
        "HashKey": "COMPONENT_MINISMG_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_MIMG_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Mini SMG.",
        "ModelHashKey": "w_sb_minismg_mag2",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpbiker"
  },
  "3125143736": {
    "HashKey": "WEAPON_PIPEBOMB",
    "NameGXT": "WT_PIPEBOMB",
    "DescriptionGXT": "WTD_PIPEBOMB",
    "Name": "Pipe Bomb",
    "Description": "Remember, it doesn't count as an IED when you buy it in a store and use it in a first world country. Part of Bikers.",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_ex_pipebomb",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "mpbiker"
  },
  "2484171525": {
    "HashKey": "WEAPON_POOLCUE",
    "NameGXT": "WT_POOLCUE",
    "DescriptionGXT": "WTD_POOLCUE",
    "Name": "Pool Cue",
    "Description": "Ah, there's no sound as satisfying as the crack of a perfect break, especially when it's the other guy's spine. Part of Bikers.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_poolcue",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "mpbiker"
  },
  "419712736": {
    "HashKey": "WEAPON_WRENCH",
    "NameGXT": "WT_WRENCH",
    "DescriptionGXT": "WTD_WRENCH",
    "Name": "Pipe Wrench",
    "Description": "Perennial favourite of apocalyptic survivalists and violent fathers the world over, apparently it also doubles as some kind of tool. Part of Bikers.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_wrench",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "mpbiker"
  },
  "3523564046": {
    "HashKey": "WEAPON_HEAVYPISTOL",
    "NameGXT": "WT_HVYPISTOL",
    "DescriptionGXT": "WTD_HVYPISTOL",
    "Name": "Heavy Pistol",
    "Description": "The heavyweight champion of the magazine fed, semi-automatic handgun world. Delivers a serious forearm workout every time. Part of The Business Update.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_heavypistol",
    "DefaultClipSize": 18,
    "Components": {
      "222992026": {
        "HashKey": "COMPONENT_HEAVYPISTOL_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_HPST_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Heavy Pistol.",
        "ModelHashKey": "w_pi_heavypistol_mag1",
        "IsDefault": true
      },
      "1694090795": {
        "HashKey": "COMPONENT_HEAVYPISTOL_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_HPST_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Heavy Pistol.",
        "ModelHashKey": "w_pi_heavypistol_mag2",
        "IsDefault": false
      },
      "899381934": {
        "HashKey": "COMPONENT_AT_PI_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_flsh",
        "IsDefault": false
      },
      "3271853210": {
        "HashKey": "COMPONENT_AT_PI_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp",
        "IsDefault": false
      },
      "2053798779": {
        "HashKey": "COMPONENT_HEAVYPISTOL_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_WOOD",
        "DescriptionGXT": "WCD_VAR_HPST",
        "Name": "Etched Wood Grip Finish",
        "Description": "",
        "ModelHashKey": "W_PI_HeavyPistol_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpbusiness"
  },
  "3231910285": {
    "HashKey": "WEAPON_SPECIALCARBINE",
    "NameGXT": "WT_SPCARBINE",
    "DescriptionGXT": "WTD_SPCARBINE",
    "Name": "Special Carbine",
    "Description": "Combining accuracy, maneuverability and low recoil, this is an extremely versatile assault rifle for any combat situation. Part of The Business Update.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "w_ar_specialcarbine",
    "DefaultClipSize": 30,
    "Components": {
      "3334989185": {
        "HashKey": "COMPONENT_SPECIALCARBINE_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_SCRB_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Special Carbine.",
        "ModelHashKey": "w_ar_specialcarbine_mag1",
        "IsDefault": true
      },
      "2089537806": {
        "HashKey": "COMPONENT_SPECIALCARBINE_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_SCRB_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Special Carbine.",
        "ModelHashKey": "w_ar_specialcarbine_mag2",
        "IsDefault": false
      },
      "1801039530": {
        "HashKey": "COMPONENT_SPECIALCARBINE_CLIP_03",
        "NameGXT": "WCT_CLIP_DRM",
        "DescriptionGXT": "WCD_CLIP3",
        "Name": "Drum Magazine",
        "Description": "Expanded capacity and slower reload.",
        "ModelHashKey": "w_ar_specialcarbine_boxmag",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2698550338": {
        "HashKey": "COMPONENT_AT_SCOPE_MEDIUM",
        "NameGXT": "WCT_SCOPE_MED",
        "DescriptionGXT": "WCD_SCOPE_MED",
        "Name": "Scope",
        "Description": "Extended-range zoom functionality.",
        "ModelHashKey": "w_at_scope_medium",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      },
      "1929467122": {
        "HashKey": "COMPONENT_SPECIALCARBINE_VARMOD_LOWRIDER",
        "NameGXT": "WCT_VAR_ETCHM",
        "DescriptionGXT": "WCD_VAR_SCAR",
        "Name": "Etched Gun Metal Finish",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbine_luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpbusiness"
  },
  "2132975508": {
    "HashKey": "WEAPON_BULLPUPRIFLE",
    "NameGXT": "WT_BULLRIFLE",
    "DescriptionGXT": "WTD_BULLRIFLE",
    "Name": "Bullpup Rifle",
    "Description": "The latest Chinese import taking America by storm, this rifle is known for its balanced handling. Lightweight and very controllable in automatic fire. Part of The High Life Update.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "w_ar_bullpuprifle",
    "DefaultClipSize": 30,
    "Components": {
      "3315675008": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_BRIF_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Bullpup Rifle.",
        "ModelHashKey": "w_ar_bullpuprifle_mag1",
        "IsDefault": true
      },
      "3009973007": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_BRIF_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Bullpup Rifle.",
        "ModelHashKey": "w_ar_bullpuprifle_mag2",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2855028148": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL",
        "NameGXT": "WCT_SCOPE_SML",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small",
        "IsDefault": false
      },
      "2205435306": {
        "HashKey": "COMPONENT_AT_AR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      },
      "2824322168": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_VARMOD_LOW",
        "NameGXT": "WCT_VAR_METAL",
        "DescriptionGXT": "WCD_VAR_BPR",
        "Name": "Gilded Gun Metal Finish",
        "Description": "",
        "ModelHashKey": "w_ar_bullpuprifle_luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpbusiness2"
  },
  "1672152130": {
    "HashKey": "WEAPON_HOMINGLAUNCHER",
    "NameGXT": "WT_HOMLNCH",
    "DescriptionGXT": "WTD_HOMLNCH",
    "Name": "Homing Launcher",
    "Description": "Infrared guided fire-and-forget missile launcher. For all your moving target needs. Part of the Festive Surprise.",
    "Group": "GROUP_HEAVY",
    "ModelHashKey": "w_lr_homing",
    "DefaultClipSize": 1,
    "Components": {
      "4162006335": {
        "HashKey": "COMPONENT_HOMINGLAUNCHER_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpchristmas2"
  },
  "2874559379": {
    "HashKey": "WEAPON_PROXMINE",
    "NameGXT": "WT_PRXMINE",
    "DescriptionGXT": "WTD_PRXMINE",
    "Name": "Proximity Mine",
    "Description": "Leave a present for your friends with these motion sensor landmines. Short delay after activation. Part of the Festive Surprise.",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_ex_apmine",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "mpchristmas2"
  },
  "126349499": {
    "HashKey": "WEAPON_SNOWBALL",
    "NameGXT": "WT_SNWBALL",
    "DescriptionGXT": "WTD_SNWBALL",
    "Name": "Snowball",
    "Description": "",
    "Group": "GROUP_THROWN",
    "ModelHashKey": "w_ex_snowball",
    "DefaultClipSize": 1,
    "Components": {},
    "Tints": [],
    "DLC": "mpchristmas2"
  },
  "2228681469": {
    "HashKey": "WEAPON_BULLPUPRIFLE_MK2",
    "NameGXT": "WT_BULLRIFLE2",
    "DescriptionGXT": "WTD_BULLRIFLE2",
    "Name": "Bullpup Rifle Mk II",
    "Description": "So precise, so exquisite, it's not so much a hail of bullets as a symphony.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "w_ar_bullpupriflemk2",
    "DefaultClipSize": 30,
    "Components": {
      "25766362": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_ar_bullpupriflemk2_mag1",
        "IsDefault": true
      },
      "4021290536": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_ar_bullpupriflemk2_mag2",
        "IsDefault": false
      },
      "2183159977": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun. Standard capacity.",
        "ModelHashKey": "W_AR_BullpupRifleMK2_Mag_TR",
        "IsDefault": false
      },
      "2845636954": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "W_AR_BullpupRifleMK2_Mag_INC",
        "IsDefault": false
      },
      "4205311469": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CLIP_ARMORPIERCING",
        "NameGXT": "WCT_CLIP_AP",
        "DescriptionGXT": "WCD_CLIP_AP",
        "Name": "Armor Piercing Rounds",
        "Description": "Increased penetration of Body Armor. Reduced capacity.",
        "ModelHashKey": "W_AR_BullpupRifleMK2_Mag_AP",
        "IsDefault": false
      },
      "1130501904": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "W_AR_BullpupRifleMK2_Mag_FMJ",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "1108334355": {
        "HashKey": "COMPONENT_AT_SIGHTS",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_1",
        "IsDefault": false
      },
      "3350057221": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO_02_MK2",
        "NameGXT": "WCT_SCOPE_MAC2",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Small Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro_2",
        "IsDefault": false
      },
      "1060929921": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL_MK2",
        "NameGXT": "WCT_SCOPE_SML2",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Medium Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small",
        "IsDefault": false
      },
      "1704640795": {
        "HashKey": "COMPONENT_AT_BP_BARREL_01",
        "NameGXT": "WCT_BARR",
        "DescriptionGXT": "WCD_BARR",
        "Name": "Default Barrel",
        "Description": "Stock barrel attachment.",
        "ModelHashKey": "W_AR_BP_MK2_Barrel1",
        "IsDefault": true
      },
      "1005743559": {
        "HashKey": "COMPONENT_AT_BP_BARREL_02",
        "NameGXT": "WCT_BARR2",
        "DescriptionGXT": "WCD_BARR2",
        "Name": "Heavy Barrel",
        "Description": "Increases damage dealt to long-range targets.",
        "ModelHashKey": "W_AR_BP_MK2_Barrel2",
        "IsDefault": false
      },
      "2205435306": {
        "HashKey": "COMPONENT_AT_AR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp",
        "IsDefault": false
      },
      "3113485012": {
        "HashKey": "COMPONENT_AT_MUZZLE_01",
        "NameGXT": "WCT_MUZZ1",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Flat Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_1",
        "IsDefault": false
      },
      "3362234491": {
        "HashKey": "COMPONENT_AT_MUZZLE_02",
        "NameGXT": "WCT_MUZZ2",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Tactical Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_2",
        "IsDefault": false
      },
      "3725708239": {
        "HashKey": "COMPONENT_AT_MUZZLE_03",
        "NameGXT": "WCT_MUZZ3",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Fat-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_3",
        "IsDefault": false
      },
      "3968886988": {
        "HashKey": "COMPONENT_AT_MUZZLE_04",
        "NameGXT": "WCT_MUZZ4",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Precision Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_4",
        "IsDefault": false
      },
      "48731514": {
        "HashKey": "COMPONENT_AT_MUZZLE_05",
        "NameGXT": "WCT_MUZZ5",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Heavy Duty Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_5",
        "IsDefault": false
      },
      "880736428": {
        "HashKey": "COMPONENT_AT_MUZZLE_06",
        "NameGXT": "WCT_MUZZ6",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Slanted Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_6",
        "IsDefault": false
      },
      "1303784126": {
        "HashKey": "COMPONENT_AT_MUZZLE_07",
        "NameGXT": "WCT_MUZZ7",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Split-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_7",
        "IsDefault": false
      },
      "2640679034": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP_02",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_afgrip_2",
        "IsDefault": false
      },
      "2923451831": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo1",
        "IsDefault": false
      },
      "3104173419": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo2",
        "IsDefault": false
      },
      "2797881576": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo3",
        "IsDefault": false
      },
      "2491819116": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo4",
        "IsDefault": false
      },
      "2318995410": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo5",
        "IsDefault": false
      },
      "36929477": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo6",
        "IsDefault": false
      },
      "4026522462": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo7",
        "IsDefault": false
      },
      "3720197850": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo8",
        "IsDefault": false
      },
      "3412267557": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo9",
        "IsDefault": false
      },
      "2826785822": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo10",
        "IsDefault": false
      },
      "3320426066": {
        "HashKey": "COMPONENT_BULLPUPRIFLE_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_ar_bullpupriflemk2_camo_ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpchristmas2017"
  },
  "2548703416": {
    "HashKey": "WEAPON_DOUBLEACTION",
    "NameGXT": "WT_REV_DA",
    "DescriptionGXT": "WTD_REV_DA",
    "Name": "Double-Action Revolver",
    "Description": "Because sometimes revenge is a dish best served six times, in quick succession, right between the eyes. Part of The Doomsday Heist.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_wep1_gun",
    "DefaultClipSize": 6,
    "Components": {
      "1328622785": {
        "HashKey": "COMPONENT_DOUBLEACTION_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_REV_DA_CLIP",
        "Name": "Default Clip",
        "Description": "Standard ammo capacity.",
        "ModelHashKey": "w_pi_wep1_mag1",
        "IsDefault": true
      }
    },
    "Tints": [],
    "DLC": "mpchristmas2017"
  },
  "1785463520": {
    "HashKey": "WEAPON_MARKSMANRIFLE_MK2",
    "NameGXT": "WT_MKRIFLE2",
    "DescriptionGXT": "WTD_MKRIFLE2",
    "Name": "Marksman Rifle Mk II",
    "Description": "Known in military circles as The Dislocator, this mod set will destroy both the target and your shoulder, in that order.",
    "Group": "GROUP_SNIPER",
    "ModelHashKey": "w_sr_marksmanriflemk2",
    "DefaultClipSize": 8,
    "Components": {
      "2497785294": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_sr_marksmanriflemk2_mag1",
        "IsDefault": true
      },
      "3872379306": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_sr_marksmanriflemk2_mag2",
        "IsDefault": false
      },
      "3615105746": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun. Standard capacity.",
        "ModelHashKey": "w_sr_marksmanriflemk2_mag_tr",
        "IsDefault": false
      },
      "1842849902": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "w_sr_marksmanriflemk2_mag_inc",
        "IsDefault": false
      },
      "4100968569": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CLIP_ARMORPIERCING",
        "NameGXT": "WCT_CLIP_AP",
        "DescriptionGXT": "WCD_CLIP_AP",
        "Name": "Armor Piercing Rounds",
        "Description": "Increased penetration of Body Armor. Reduced capacity.",
        "ModelHashKey": "w_sr_marksmanriflemk2_mag_ap",
        "IsDefault": false
      },
      "3779763923": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "w_sr_marksmanriflemk2_mag_fmj",
        "IsDefault": false
      },
      "1108334355": {
        "HashKey": "COMPONENT_AT_SIGHTS",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_1",
        "IsDefault": false
      },
      "3328927042": {
        "HashKey": "COMPONENT_AT_SCOPE_MEDIUM_MK2",
        "NameGXT": "WCT_SCOPE_MED2",
        "DescriptionGXT": "WCD_SCOPE_MED",
        "Name": "Large Scope",
        "Description": "Extended-range zoom functionality.",
        "ModelHashKey": "w_at_scope_medium_2",
        "IsDefault": false
      },
      "1528590652": {
        "HashKey": "COMPONENT_AT_SCOPE_LARGE_FIXED_ZOOM_MK2",
        "NameGXT": "WCT_SCOPE_LRG2",
        "DescriptionGXT": "WCD_SCOPE_LRF",
        "Name": "Zoom Scope",
        "Description": "Long-range fixed zoom functionality.",
        "ModelHashKey": "w_at_scope_large",
        "IsDefault": true
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2205435306": {
        "HashKey": "COMPONENT_AT_AR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp",
        "IsDefault": false
      },
      "3113485012": {
        "HashKey": "COMPONENT_AT_MUZZLE_01",
        "NameGXT": "WCT_MUZZ1",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Flat Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_1",
        "IsDefault": false
      },
      "3362234491": {
        "HashKey": "COMPONENT_AT_MUZZLE_02",
        "NameGXT": "WCT_MUZZ2",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Tactical Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_2",
        "IsDefault": false
      },
      "3725708239": {
        "HashKey": "COMPONENT_AT_MUZZLE_03",
        "NameGXT": "WCT_MUZZ3",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Fat-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_3",
        "IsDefault": false
      },
      "3968886988": {
        "HashKey": "COMPONENT_AT_MUZZLE_04",
        "NameGXT": "WCT_MUZZ4",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Precision Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_4",
        "IsDefault": false
      },
      "48731514": {
        "HashKey": "COMPONENT_AT_MUZZLE_05",
        "NameGXT": "WCT_MUZZ5",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Heavy Duty Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_5",
        "IsDefault": false
      },
      "880736428": {
        "HashKey": "COMPONENT_AT_MUZZLE_06",
        "NameGXT": "WCT_MUZZ6",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Slanted Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_6",
        "IsDefault": false
      },
      "1303784126": {
        "HashKey": "COMPONENT_AT_MUZZLE_07",
        "NameGXT": "WCT_MUZZ7",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Split-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_7",
        "IsDefault": false
      },
      "941317513": {
        "HashKey": "COMPONENT_AT_MRFL_BARREL_01",
        "NameGXT": "WCT_BARR",
        "DescriptionGXT": "WCD_BARR",
        "Name": "Default Barrel",
        "Description": "Stock barrel attachment.",
        "ModelHashKey": "w_sr_mr_mk2_barrel_1",
        "IsDefault": true
      },
      "1748450780": {
        "HashKey": "COMPONENT_AT_MRFL_BARREL_02",
        "NameGXT": "WCT_BARR2",
        "DescriptionGXT": "WCD_BARR2",
        "Name": "Heavy Barrel",
        "Description": "Increases damage dealt to long-range targets.",
        "ModelHashKey": "w_sr_mr_mk2_barrel_2",
        "IsDefault": false
      },
      "2640679034": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP_02",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_afgrip_2",
        "IsDefault": false
      },
      "2425682848": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo1",
        "IsDefault": false
      },
      "1931539634": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo2",
        "IsDefault": false
      },
      "1624199183": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo3",
        "IsDefault": false
      },
      "4268133183": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo4",
        "IsDefault": false
      },
      "4084561241": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo5",
        "IsDefault": false
      },
      "423313640": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo6",
        "IsDefault": false
      },
      "276639596": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo7",
        "IsDefault": false
      },
      "3303610433": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo8",
        "IsDefault": false
      },
      "2612118995": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo9",
        "IsDefault": false
      },
      "996213771": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo10",
        "IsDefault": false
      },
      "3080918746": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_sr_marksmanriflemk2_camo_ind",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpchristmas2017"
  },
  "1432025498": {
    "HashKey": "WEAPON_PUMPSHOTGUN_MK2",
    "NameGXT": "WT_SG_PMP2",
    "DescriptionGXT": "WTD_SG_PMP2",
    "Name": "Pump Shotgun Mk II",
    "Description": "Only one thing pumps more action than a pump action: watch out, the recoil is almost as deadly as the shot.",
    "Group": "GROUP_SHOTGUN",
    "ModelHashKey": "w_sg_pumpshotgunmk2",
    "DefaultClipSize": 8,
    "Components": {
      "3449028929": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CLIP_01",
        "NameGXT": "WCT_SHELL",
        "DescriptionGXT": "WCD_SHELL",
        "Name": "Default Shells",
        "Description": "Standard shotgun ammunition.",
        "ModelHashKey": "w_sg_pumpshotgunmk2_mag1",
        "IsDefault": true
      },
      "2676628469": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_SHELL_INC",
        "DescriptionGXT": "WCD_SHELL_INC",
        "Name": "Dragon's Breath Shells",
        "Description": "Has a chance to set targets on fire when shot.",
        "ModelHashKey": "w_sg_pumpshotgunmk2_mag_inc",
        "IsDefault": false
      },
      "1315288101": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CLIP_ARMORPIERCING",
        "NameGXT": "WCT_SHELL_AP",
        "DescriptionGXT": "WCD_SHELL_AP",
        "Name": "Steel Buckshot Shells",
        "Description": "Increased penetration of Body Armor.",
        "ModelHashKey": "w_sg_pumpshotgunmk2_mag_ap",
        "IsDefault": false
      },
      "3914869031": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CLIP_HOLLOWPOINT",
        "NameGXT": "WCT_SHELL_HP",
        "DescriptionGXT": "WCD_SHELL_HP",
        "Name": "Flechette Shells",
        "Description": "Increased damage to targets without Body Armor.",
        "ModelHashKey": "w_sg_pumpshotgunmk2_mag_hp",
        "IsDefault": false
      },
      "1004815965": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CLIP_EXPLOSIVE",
        "NameGXT": "WCT_SHELL_EX",
        "DescriptionGXT": "WCD_SHELL_EX",
        "Name": "Explosive Slugs",
        "Description": "Projectile which explodes on impact.",
        "ModelHashKey": "w_sg_pumpshotgunmk2_mag_exp",
        "IsDefault": false
      },
      "1108334355": {
        "HashKey": "COMPONENT_AT_SIGHTS",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_1",
        "IsDefault": false
      },
      "77277509": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO_MK2",
        "NameGXT": "WCT_SCOPE_MAC2",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Small Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro",
        "IsDefault": false
      },
      "1060929921": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL_MK2",
        "NameGXT": "WCT_SCOPE_SML2",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Medium Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2890063729": {
        "HashKey": "COMPONENT_AT_SR_SUPP_03",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_SR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_sr_supp3",
        "IsDefault": false
      },
      "1602080333": {
        "HashKey": "COMPONENT_AT_MUZZLE_08",
        "NameGXT": "WCT_MUZZ8",
        "DescriptionGXT": "WCD_MUZZ_SR",
        "Name": "Squared Muzzle Brake",
        "Description": "Reduces recoil when firing.",
        "ModelHashKey": "w_at_muzzle_8_xm17",
        "IsDefault": false
      },
      "3820854852": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo1",
        "IsDefault": false
      },
      "387223451": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo2",
        "IsDefault": false
      },
      "617753366": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo3",
        "IsDefault": false
      },
      "4072589040": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo4",
        "IsDefault": false
      },
      "8741501": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo5",
        "IsDefault": false
      },
      "3693681093": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo6",
        "IsDefault": false
      },
      "3783533691": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo7",
        "IsDefault": false
      },
      "3639579478": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo8",
        "IsDefault": false
      },
      "4012490698": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo9",
        "IsDefault": false
      },
      "1739501925": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo10",
        "IsDefault": false
      },
      "1178671645": {
        "HashKey": "COMPONENT_PUMPSHOTGUN_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_sg_pumpshotgunmk2_camo_ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpchristmas2017"
  },
  "3415619887": {
    "HashKey": "WEAPON_REVOLVER_MK2",
    "NameGXT": "WT_REVOLVER2",
    "DescriptionGXT": "WTD_REVOLVER2",
    "Name": "Heavy Revolver Mk II",
    "Description": "If you can lift it, this is the closest you'll get to shooting someone with a freight train.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_revolvermk2",
    "DefaultClipSize": 6,
    "Components": {
      "3122911422": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1_RV",
        "DescriptionGXT": "WCD_CLIP1_RV",
        "Name": "Default Rounds",
        "Description": "Standard revolver ammunition.",
        "ModelHashKey": "w_pi_revolvermk2_mag1",
        "IsDefault": true
      },
      "3336103030": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR_RV",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun.",
        "ModelHashKey": "w_pi_revolvermk2_mag4",
        "IsDefault": false
      },
      "15712037": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC_RV",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which set targets on fire when shot.",
        "ModelHashKey": "w_pi_revolvermk2_mag3",
        "IsDefault": false
      },
      "284438159": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CLIP_HOLLOWPOINT",
        "NameGXT": "WCT_CLIP_HP",
        "DescriptionGXT": "WCD_CLIP_HP_RV",
        "Name": "Hollow Point Rounds",
        "Description": "Increased damage to targets without Body Armor.",
        "ModelHashKey": "w_pi_revolvermk2_mag2",
        "IsDefault": false
      },
      "231258687": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ_RV",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass.",
        "ModelHashKey": "w_pi_revolvermk2_mag5",
        "IsDefault": false
      },
      "1108334355": {
        "HashKey": "COMPONENT_AT_SIGHTS",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_1",
        "IsDefault": false
      },
      "77277509": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO_MK2",
        "NameGXT": "WCT_SCOPE_MAC2",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Small Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro",
        "IsDefault": false
      },
      "899381934": {
        "HashKey": "COMPONENT_AT_PI_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_flsh",
        "IsDefault": false
      },
      "654802123": {
        "HashKey": "COMPONENT_AT_PI_COMP_03",
        "NameGXT": "WCT_COMP",
        "DescriptionGXT": "WCD_COMP",
        "Name": "Compensator",
        "Description": "Reduces recoil for rapid fire.",
        "ModelHashKey": "w_at_pi_comp_3",
        "IsDefault": false
      },
      "3225415071": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo1",
        "IsDefault": false
      },
      "11918884": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo2",
        "IsDefault": false
      },
      "176157112": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo3",
        "IsDefault": false
      },
      "4074914441": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo4",
        "IsDefault": false
      },
      "288456487": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo5",
        "IsDefault": false
      },
      "398658626": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo6",
        "IsDefault": false
      },
      "628697006": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo7",
        "IsDefault": false
      },
      "925911836": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo8",
        "IsDefault": false
      },
      "1222307441": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo9",
        "IsDefault": false
      },
      "552442715": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo10",
        "IsDefault": false
      },
      "3646023783": {
        "HashKey": "COMPONENT_REVOLVER_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_pi_revolvermk2_camo_ind",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpchristmas2017"
  },
  "2285322324": {
    "HashKey": "WEAPON_SNSPISTOL_MK2",
    "NameGXT": "WT_SNSPISTOL2",
    "DescriptionGXT": "WTD_SNSPISTOL2",
    "Name": "SNS Pistol Mk II",
    "Description": "The ultimate purse-filler: if you want to make Saturday Night really special, this is your ticket.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_sns_pistolmk2",
    "DefaultClipSize": 6,
    "Components": {
      "21392614": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_pi_sns_pistolmk2_mag1",
        "IsDefault": true
      },
      "3465283442": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_pi_sns_pistolmk2_mag2",
        "IsDefault": false
      },
      "2418909806": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR_RV",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun.",
        "ModelHashKey": "W_PI_SNS_PistolMK2_Mag_TR",
        "IsDefault": false
      },
      "3870121849": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC_NS",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot.",
        "ModelHashKey": "W_PI_SNS_PistolMK2_Mag_INC",
        "IsDefault": false
      },
      "2366665730": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CLIP_HOLLOWPOINT",
        "NameGXT": "WCT_CLIP_HP",
        "DescriptionGXT": "WCD_CLIP_HP_RV",
        "Name": "Hollow Point Rounds",
        "Description": "Increased damage to targets without Body Armor.",
        "ModelHashKey": "W_PI_SNS_PistolMK2_Mag_HP",
        "IsDefault": false
      },
      "3239176998": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ_RV",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass.",
        "ModelHashKey": "W_PI_SNS_PistolMK2_Mag_FMJ",
        "IsDefault": false
      },
      "1246324211": {
        "HashKey": "COMPONENT_AT_PI_FLSH_03",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_snsmk2_flsh_1",
        "IsDefault": false
      },
      "1205768792": {
        "HashKey": "COMPONENT_AT_PI_RAIL_02",
        "NameGXT": "WCT_SCOPE_PI",
        "DescriptionGXT": "WCD_SCOPE_PI",
        "Name": "Mounted Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_pi_rail_2",
        "IsDefault": false
      },
      "1709866683": {
        "HashKey": "COMPONENT_AT_PI_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp_2",
        "IsDefault": false
      },
      "2860680127": {
        "HashKey": "COMPONENT_AT_PI_COMP_02",
        "NameGXT": "WCT_COMP",
        "DescriptionGXT": "WCD_COMP",
        "Name": "Compensator",
        "Description": "Reduces recoil for rapid fire.",
        "ModelHashKey": "w_at_pi_comp_2",
        "IsDefault": false
      },
      "259780317": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo1",
        "IsDefault": false
      },
      "2321624822": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo2",
        "IsDefault": false
      },
      "1996130345": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo3",
        "IsDefault": false
      },
      "2839309484": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo4",
        "IsDefault": false
      },
      "2626704212": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo5",
        "IsDefault": false
      },
      "1308243489": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo6",
        "IsDefault": false
      },
      "1122574335": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo7",
        "IsDefault": false
      },
      "1420313469": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo8",
        "IsDefault": false
      },
      "109848390": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo9",
        "IsDefault": false
      },
      "593945703": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_Camo10",
        "IsDefault": false
      },
      "1142457062": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_pi_sns_pistolmk2_camo_ind1",
        "IsDefault": false
      },
      "3891161322": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo1",
        "IsDefault": false
      },
      "691432737": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_02_SLIDE",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo2",
        "IsDefault": false
      },
      "987648331": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_03_SLIDE",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo3",
        "IsDefault": false
      },
      "3863286761": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_04_SLIDE",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo4",
        "IsDefault": false
      },
      "3447384986": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_05_SLIDE",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo5",
        "IsDefault": false
      },
      "4202375078": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_06_SLIDE",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo6",
        "IsDefault": false
      },
      "3800418970": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_07_SLIDE",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo7",
        "IsDefault": false
      },
      "730876697": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_08_SLIDE",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo8",
        "IsDefault": false
      },
      "583159708": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_09_SLIDE",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo9",
        "IsDefault": false
      },
      "2366463693": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_10_SLIDE",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMk2_SL_Camo10",
        "IsDefault": false
      },
      "520557834": {
        "HashKey": "COMPONENT_SNSPISTOL_MK2_CAMO_IND_01_SLIDE",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "W_PI_SNS_PistolMK2_SL_Camo_Ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpchristmas2017"
  },
  "2526821735": {
    "HashKey": "WEAPON_SPECIALCARBINE_MK2",
    "NameGXT": "WT_SPCARBINE2",
    "DescriptionGXT": "WTD_SPCARBINE2",
    "Name": "Special Carbine Mk II",
    "Description": "The jack of all trades just got a serious upgrade: bow to the master.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "w_ar_specialcarbinemk2",
    "DefaultClipSize": 30,
    "Components": {
      "382112385": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_ar_specialcarbinemk2_mag1",
        "IsDefault": true
      },
      "3726614828": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_ar_specialcarbinemk2_mag2",
        "IsDefault": false
      },
      "2271594122": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun. Standard capacity.",
        "ModelHashKey": "w_ar_specialcarbinemk2_mag_tr",
        "IsDefault": false
      },
      "3724612230": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "w_ar_specialcarbinemk2_mag_inc",
        "IsDefault": false
      },
      "1362433589": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CLIP_ARMORPIERCING",
        "NameGXT": "WCT_CLIP_AP",
        "DescriptionGXT": "WCD_CLIP_AP",
        "Name": "Armor Piercing Rounds",
        "Description": "Increased penetration of Body Armor. Reduced capacity.",
        "ModelHashKey": "w_ar_specialcarbinemk2_mag_ap",
        "IsDefault": false
      },
      "1346235024": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "w_ar_specialcarbinemk2_mag_fmj",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "1108334355": {
        "HashKey": "COMPONENT_AT_SIGHTS",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_1",
        "IsDefault": false
      },
      "77277509": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO_MK2",
        "NameGXT": "WCT_SCOPE_MAC2",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Small Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro",
        "IsDefault": false
      },
      "3328927042": {
        "HashKey": "COMPONENT_AT_SCOPE_MEDIUM_MK2",
        "NameGXT": "WCT_SCOPE_MED2",
        "DescriptionGXT": "WCD_SCOPE_MED",
        "Name": "Large Scope",
        "Description": "Extended-range zoom functionality.",
        "ModelHashKey": "w_at_scope_medium_2",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "3113485012": {
        "HashKey": "COMPONENT_AT_MUZZLE_01",
        "NameGXT": "WCT_MUZZ1",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Flat Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_1",
        "IsDefault": false
      },
      "3362234491": {
        "HashKey": "COMPONENT_AT_MUZZLE_02",
        "NameGXT": "WCT_MUZZ2",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Tactical Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_2",
        "IsDefault": false
      },
      "3725708239": {
        "HashKey": "COMPONENT_AT_MUZZLE_03",
        "NameGXT": "WCT_MUZZ3",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Fat-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_3",
        "IsDefault": false
      },
      "3968886988": {
        "HashKey": "COMPONENT_AT_MUZZLE_04",
        "NameGXT": "WCT_MUZZ4",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Precision Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_4",
        "IsDefault": false
      },
      "48731514": {
        "HashKey": "COMPONENT_AT_MUZZLE_05",
        "NameGXT": "WCT_MUZZ5",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Heavy Duty Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_5",
        "IsDefault": false
      },
      "880736428": {
        "HashKey": "COMPONENT_AT_MUZZLE_06",
        "NameGXT": "WCT_MUZZ6",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Slanted Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_6",
        "IsDefault": false
      },
      "1303784126": {
        "HashKey": "COMPONENT_AT_MUZZLE_07",
        "NameGXT": "WCT_MUZZ7",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Split-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_7",
        "IsDefault": false
      },
      "2640679034": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP_02",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_afgrip_2",
        "IsDefault": false
      },
      "3879097257": {
        "HashKey": "COMPONENT_AT_SC_BARREL_01",
        "NameGXT": "WCT_BARR",
        "DescriptionGXT": "WCD_BARR",
        "Name": "Default Barrel",
        "Description": "Stock barrel attachment.",
        "ModelHashKey": "w_ar_sc_barrel_1",
        "IsDefault": true
      },
      "4185880635": {
        "HashKey": "COMPONENT_AT_SC_BARREL_02",
        "NameGXT": "WCT_BARR2",
        "DescriptionGXT": "WCD_BARR2",
        "Name": "Heavy Barrel",
        "Description": "Increases damage dealt to long-range targets.",
        "ModelHashKey": "w_ar_sc_barrel_2",
        "IsDefault": false
      },
      "3557537083": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo1",
        "IsDefault": false
      },
      "1125852043": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo2",
        "IsDefault": false
      },
      "886015732": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo3",
        "IsDefault": false
      },
      "3032680157": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo4",
        "IsDefault": false
      },
      "3999758885": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo5",
        "IsDefault": false
      },
      "3750812792": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo6",
        "IsDefault": false
      },
      "172765678": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo7",
        "IsDefault": false
      },
      "2312089847": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo8",
        "IsDefault": false
      },
      "2072122460": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo9",
        "IsDefault": false
      },
      "2308747125": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo10",
        "IsDefault": false
      },
      "1377355801": {
        "HashKey": "COMPONENT_SPECIALCARBINE_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_ar_specialcarbinemk2_camo_ind",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpchristmas2017"
  },
  "2939590305": {
    "HashKey": "WEAPON_RAYPISTOL",
    "NameGXT": "WT_RAYPISTOL",
    "DescriptionGXT": "WTD_RAYPISTOL",
    "Name": "Up-n-Atomizer",
    "Description": "Republican Space Ranger Special, fresh from the galactic war on socialism: no ammo, no mag, just one brutal energy pulse after another.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_raygun",
    "DefaultClipSize": 1,
    "Components": {
      "3621517063": {
        "HashKey": "COMPONENT_RAYPISTOL_VARMOD_XMAS18",
        "NameGXT": "WCT_VAR_RAY18",
        "DescriptionGXT": "WCD_VAR_RAY18",
        "Name": "Festive tint",
        "Description": "The Festive tint for the Up-n-Atomizer.",
        "ModelHashKey": "w_pi_raygun_ev",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "RWT_TINT0",
        "Name": "Blue tint"
      },
      {
        "NameGXT": "RWT_TINT1",
        "Name": "Purple tint"
      },
      {
        "NameGXT": "RWT_TINT2",
        "Name": "Green tint"
      },
      {
        "NameGXT": "RWT_TINT3",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "RWT_TINT4",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "RWT_TINT5",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "RWT_TINT6",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpchristmas2018"
  },
  "1198256469": {
    "HashKey": "WEAPON_RAYCARBINE",
    "NameGXT": "WT_RAYCARBINE",
    "DescriptionGXT": "WTD_RAYCARBINE",
    "Name": "Unholy Hellbringer",
    "Description": "Republican Space Ranger Special. If you want to turn a little green man into little green goo, this is the only American way to do it.",
    "Group": "GROUP_MG",
    "ModelHashKey": "w_ar_srifle",
    "DefaultClipSize": 9999,
    "Components": {},
    "Tints": [
      {
        "NameGXT": "RWT_TINT7",
        "Name": "Space Ranger tint"
      },
      {
        "NameGXT": "RWT_TINT1",
        "Name": "Purple tint"
      },
      {
        "NameGXT": "RWT_TINT2",
        "Name": "Green tint"
      },
      {
        "NameGXT": "RWT_TINT3",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "RWT_TINT4",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "RWT_TINT5",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "RWT_TINT6",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpchristmas2018"
  },
  "3056410471": {
    "HashKey": "WEAPON_RAYMINIGUN",
    "NameGXT": "WT_RAYMINIGUN",
    "DescriptionGXT": "WTD_RAYMINIGUN",
    "Name": "Widowmaker",
    "Description": "Republican Space Ranger Special. GO AHEAD, SAY I'M COMPENSATING FOR SOMETHING. I DARE YOU.",
    "Group": "GROUP_HEAVY",
    "ModelHashKey": "w_mg_sminigun",
    "DefaultClipSize": 15000,
    "Components": {
      "3370020614": {
        "HashKey": "COMPONENT_MINIGUN_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "RWT_TINT7",
        "Name": "Space Ranger tint"
      },
      {
        "NameGXT": "RWT_TINT1",
        "Name": "Purple tint"
      },
      {
        "NameGXT": "RWT_TINT2",
        "Name": "Green tint"
      },
      {
        "NameGXT": "RWT_TINT3",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "RWT_TINT4",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "RWT_TINT5",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "RWT_TINT6",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpchristmas2018"
  },
  "961495388": {
    "HashKey": "WEAPON_ASSAULTRIFLE_MK2",
    "NameGXT": "WT_RIFLE_ASL2",
    "DescriptionGXT": "WTD_RIFLE_ASL2",
    "Name": "Assault Rifle Mk II",
    "Description": "The definitive revision of an all-time classic: all it takes is a little work, and looks can kill after all.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "w_ar_assaultriflemk2",
    "DefaultClipSize": 30,
    "Components": {
      "2249208895": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_ar_assaultriflemk2_mag1",
        "IsDefault": true
      },
      "3509242479": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_ar_assaultriflemk2_mag2",
        "IsDefault": false
      },
      "4012669121": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun. Standard capacity.",
        "ModelHashKey": "w_ar_assaultriflemk2_mag_tr",
        "IsDefault": false
      },
      "4218476627": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "w_ar_assaultriflemk2_mag_inc",
        "IsDefault": false
      },
      "2816286296": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CLIP_ARMORPIERCING",
        "NameGXT": "WCT_CLIP_AP",
        "DescriptionGXT": "WCD_CLIP_AP",
        "Name": "Armor Piercing Rounds",
        "Description": "Increased penetration of Body Armor. Reduced capacity.",
        "ModelHashKey": "w_ar_assaultriflemk2_mag_ap",
        "IsDefault": false
      },
      "1675665560": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "w_ar_assaultriflemk2_mag_fmj",
        "IsDefault": false
      },
      "2640679034": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP_02",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_afgrip_2",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "1108334355": {
        "HashKey": "COMPONENT_AT_SIGHTS",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_1",
        "IsDefault": false
      },
      "77277509": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO_MK2",
        "NameGXT": "WCT_SCOPE_MAC2",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Small Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro",
        "IsDefault": false
      },
      "3328927042": {
        "HashKey": "COMPONENT_AT_SCOPE_MEDIUM_MK2",
        "NameGXT": "WCT_SCOPE_MED2",
        "DescriptionGXT": "WCD_SCOPE_MED",
        "Name": "Large Scope",
        "Description": "Extended-range zoom functionality.",
        "ModelHashKey": "w_at_scope_medium_2",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "3113485012": {
        "HashKey": "COMPONENT_AT_MUZZLE_01",
        "NameGXT": "WCT_MUZZ1",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Flat Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_1",
        "IsDefault": false
      },
      "3362234491": {
        "HashKey": "COMPONENT_AT_MUZZLE_02",
        "NameGXT": "WCT_MUZZ2",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Tactical Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_2",
        "IsDefault": false
      },
      "3725708239": {
        "HashKey": "COMPONENT_AT_MUZZLE_03",
        "NameGXT": "WCT_MUZZ3",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Fat-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_3",
        "IsDefault": false
      },
      "3968886988": {
        "HashKey": "COMPONENT_AT_MUZZLE_04",
        "NameGXT": "WCT_MUZZ4",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Precision Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_4",
        "IsDefault": false
      },
      "48731514": {
        "HashKey": "COMPONENT_AT_MUZZLE_05",
        "NameGXT": "WCT_MUZZ5",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Heavy Duty Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_5",
        "IsDefault": false
      },
      "880736428": {
        "HashKey": "COMPONENT_AT_MUZZLE_06",
        "NameGXT": "WCT_MUZZ6",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Slanted Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_6",
        "IsDefault": false
      },
      "1303784126": {
        "HashKey": "COMPONENT_AT_MUZZLE_07",
        "NameGXT": "WCT_MUZZ7",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Split-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_7",
        "IsDefault": false
      },
      "1134861606": {
        "HashKey": "COMPONENT_AT_AR_BARREL_01",
        "NameGXT": "WCT_BARR",
        "DescriptionGXT": "WCD_BARR",
        "Name": "Default Barrel",
        "Description": "Stock barrel attachment.",
        "ModelHashKey": "w_at_ar_barrel_1",
        "IsDefault": true
      },
      "1447477866": {
        "HashKey": "COMPONENT_AT_AR_BARREL_02",
        "NameGXT": "WCT_BARR2",
        "DescriptionGXT": "WCD_BARR2",
        "Name": "Heavy Barrel",
        "Description": "Increases damage dealt to long-range targets.",
        "ModelHashKey": "w_at_ar_barrel_2",
        "IsDefault": false
      },
      "2434475183": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo1",
        "IsDefault": false
      },
      "937772107": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo2",
        "IsDefault": false
      },
      "1401650071": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo3",
        "IsDefault": false
      },
      "628662130": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo4",
        "IsDefault": false
      },
      "3309920045": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo5",
        "IsDefault": false
      },
      "3482022833": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo6",
        "IsDefault": false
      },
      "2847614993": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo7",
        "IsDefault": false
      },
      "4234628436": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo8",
        "IsDefault": false
      },
      "2088750491": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo9",
        "IsDefault": false
      },
      "2781053842": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo10",
        "IsDefault": false
      },
      "3115408816": {
        "HashKey": "COMPONENT_ASSAULTRIFLE_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_at_armk2_camo_ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpgunrunning"
  },
  "4208062921": {
    "HashKey": "WEAPON_CARBINERIFLE_MK2",
    "NameGXT": "WT_RIFLE_CBN2",
    "DescriptionGXT": "WTD_RIFLE_CBN2",
    "Name": "Carbine Rifle Mk II",
    "Description": "This is bespoke, artisan firepower: you couldn't deliver a hail of bullets with more love and care if you inserted them by hand.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "w_ar_carbineriflemk2",
    "DefaultClipSize": 30,
    "Components": {
      "1283078430": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_ar_carbineriflemk2_mag1",
        "IsDefault": true
      },
      "1574296533": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_ar_carbineriflemk2_mag2",
        "IsDefault": false
      },
      "391640422": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun. Standard capacity.",
        "ModelHashKey": "w_ar_carbineriflemk2_mag_tr",
        "IsDefault": false
      },
      "1025884839": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "w_ar_carbineriflemk2_mag_inc",
        "IsDefault": false
      },
      "626875735": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CLIP_ARMORPIERCING",
        "NameGXT": "WCT_CLIP_AP",
        "DescriptionGXT": "WCD_CLIP_AP",
        "Name": "Armor Piercing Rounds",
        "Description": "Increased penetration of Body Armor. Reduced capacity.",
        "ModelHashKey": "w_ar_carbineriflemk2_mag_ap",
        "IsDefault": false
      },
      "1141059345": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "w_ar_carbineriflemk2_mag_fmj",
        "IsDefault": false
      },
      "2640679034": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP_02",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_afgrip_2",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "1108334355": {
        "HashKey": "COMPONENT_AT_SIGHTS",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_1",
        "IsDefault": false
      },
      "77277509": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO_MK2",
        "NameGXT": "WCT_SCOPE_MAC2",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Small Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro",
        "IsDefault": false
      },
      "3328927042": {
        "HashKey": "COMPONENT_AT_SCOPE_MEDIUM_MK2",
        "NameGXT": "WCT_SCOPE_MED2",
        "DescriptionGXT": "WCD_SCOPE_MED",
        "Name": "Large Scope",
        "Description": "Extended-range zoom functionality.",
        "ModelHashKey": "w_at_scope_medium_2",
        "IsDefault": false
      },
      "2205435306": {
        "HashKey": "COMPONENT_AT_AR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp",
        "IsDefault": false
      },
      "3113485012": {
        "HashKey": "COMPONENT_AT_MUZZLE_01",
        "NameGXT": "WCT_MUZZ1",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Flat Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_1",
        "IsDefault": false
      },
      "3362234491": {
        "HashKey": "COMPONENT_AT_MUZZLE_02",
        "NameGXT": "WCT_MUZZ2",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Tactical Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_2",
        "IsDefault": false
      },
      "3725708239": {
        "HashKey": "COMPONENT_AT_MUZZLE_03",
        "NameGXT": "WCT_MUZZ3",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Fat-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_3",
        "IsDefault": false
      },
      "3968886988": {
        "HashKey": "COMPONENT_AT_MUZZLE_04",
        "NameGXT": "WCT_MUZZ4",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Precision Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_4",
        "IsDefault": false
      },
      "48731514": {
        "HashKey": "COMPONENT_AT_MUZZLE_05",
        "NameGXT": "WCT_MUZZ5",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Heavy Duty Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_5",
        "IsDefault": false
      },
      "880736428": {
        "HashKey": "COMPONENT_AT_MUZZLE_06",
        "NameGXT": "WCT_MUZZ6",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Slanted Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_6",
        "IsDefault": false
      },
      "1303784126": {
        "HashKey": "COMPONENT_AT_MUZZLE_07",
        "NameGXT": "WCT_MUZZ7",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Split-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_7",
        "IsDefault": false
      },
      "2201368575": {
        "HashKey": "COMPONENT_AT_CR_BARREL_01",
        "NameGXT": "WCT_BARR",
        "DescriptionGXT": "WCD_BARR",
        "Name": "Default Barrel",
        "Description": "Stock barrel attachment.",
        "ModelHashKey": "w_at_cr_barrel_1",
        "IsDefault": true
      },
      "2335983627": {
        "HashKey": "COMPONENT_AT_CR_BARREL_02",
        "NameGXT": "WCT_BARR2",
        "DescriptionGXT": "WCD_BARR2",
        "Name": "Heavy Barrel",
        "Description": "Increases damage dealt to long-range targets.",
        "ModelHashKey": "w_at_cr_barrel_2",
        "IsDefault": false
      },
      "1272803094": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo1",
        "IsDefault": false
      },
      "1080719624": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo2",
        "IsDefault": false
      },
      "792221348": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo3",
        "IsDefault": false
      },
      "3842785869": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo4",
        "IsDefault": false
      },
      "3548192559": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo5",
        "IsDefault": false
      },
      "2250671235": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo6",
        "IsDefault": false
      },
      "4095795318": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo7",
        "IsDefault": false
      },
      "2866892280": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo8",
        "IsDefault": false
      },
      "2559813981": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo9",
        "IsDefault": false
      },
      "1796459838": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo10",
        "IsDefault": false
      },
      "3663056191": {
        "HashKey": "COMPONENT_CARBINERIFLE_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_ar_carbineriflemk2_camo_ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpgunrunning"
  },
  "3686625920": {
    "HashKey": "WEAPON_COMBATMG_MK2",
    "NameGXT": "WT_MG_CBT2",
    "DescriptionGXT": "WTD_MG_CBT2",
    "Name": "Combat MG Mk II",
    "Description": "You can never have too much of a good thing: after all, if the first shot counts, then the next hundred or so must count for double.",
    "Group": "GROUP_MG",
    "ModelHashKey": "w_mg_combatmgmk2",
    "DefaultClipSize": 100,
    "Components": {
      "1227564412": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_mg_combatmgmk2_mag1",
        "IsDefault": true
      },
      "400507625": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_mg_combatmgmk2_mag2",
        "IsDefault": false
      },
      "4133787461": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun. Standard capacity.",
        "ModelHashKey": "w_mg_combatmgmk2_mag_tr",
        "IsDefault": false
      },
      "3274096058": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "w_mg_combatmgmk2_mag_inc",
        "IsDefault": false
      },
      "696788003": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CLIP_ARMORPIERCING",
        "NameGXT": "WCT_CLIP_AP",
        "DescriptionGXT": "WCD_CLIP_AP",
        "Name": "Armor Piercing Rounds",
        "Description": "Increased penetration of Body Armor. Reduced capacity.",
        "ModelHashKey": "w_mg_combatmgmk2_mag_ap",
        "IsDefault": false
      },
      "1475288264": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "w_mg_combatmgmk2_mag_fmj",
        "IsDefault": false
      },
      "2640679034": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP_02",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_afgrip_2",
        "IsDefault": false
      },
      "1108334355": {
        "HashKey": "COMPONENT_AT_SIGHTS",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_1",
        "IsDefault": false
      },
      "1060929921": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL_MK2",
        "NameGXT": "WCT_SCOPE_SML2",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Medium Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small",
        "IsDefault": false
      },
      "3328927042": {
        "HashKey": "COMPONENT_AT_SCOPE_MEDIUM_MK2",
        "NameGXT": "WCT_SCOPE_MED2",
        "DescriptionGXT": "WCD_SCOPE_MED",
        "Name": "Large Scope",
        "Description": "Extended-range zoom functionality.",
        "ModelHashKey": "w_at_scope_medium_2",
        "IsDefault": false
      },
      "3113485012": {
        "HashKey": "COMPONENT_AT_MUZZLE_01",
        "NameGXT": "WCT_MUZZ1",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Flat Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_1",
        "IsDefault": false
      },
      "3362234491": {
        "HashKey": "COMPONENT_AT_MUZZLE_02",
        "NameGXT": "WCT_MUZZ2",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Tactical Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_2",
        "IsDefault": false
      },
      "3725708239": {
        "HashKey": "COMPONENT_AT_MUZZLE_03",
        "NameGXT": "WCT_MUZZ3",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Fat-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_3",
        "IsDefault": false
      },
      "3968886988": {
        "HashKey": "COMPONENT_AT_MUZZLE_04",
        "NameGXT": "WCT_MUZZ4",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Precision Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_4",
        "IsDefault": false
      },
      "48731514": {
        "HashKey": "COMPONENT_AT_MUZZLE_05",
        "NameGXT": "WCT_MUZZ5",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Heavy Duty Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_5",
        "IsDefault": false
      },
      "880736428": {
        "HashKey": "COMPONENT_AT_MUZZLE_06",
        "NameGXT": "WCT_MUZZ6",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Slanted Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_6",
        "IsDefault": false
      },
      "1303784126": {
        "HashKey": "COMPONENT_AT_MUZZLE_07",
        "NameGXT": "WCT_MUZZ7",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Split-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_7",
        "IsDefault": false
      },
      "3276730932": {
        "HashKey": "COMPONENT_AT_MG_BARREL_01",
        "NameGXT": "WCT_BARR",
        "DescriptionGXT": "WCD_BARR",
        "Name": "Default Barrel",
        "Description": "Stock barrel attachment.",
        "ModelHashKey": "w_at_mg_barrel_1",
        "IsDefault": true
      },
      "3051509595": {
        "HashKey": "COMPONENT_AT_MG_BARREL_02",
        "NameGXT": "WCT_BARR2",
        "DescriptionGXT": "WCD_BARR2",
        "Name": "Heavy Barrel",
        "Description": "Increases damage dealt to long-range targets.",
        "ModelHashKey": "w_at_mg_barrel_2",
        "IsDefault": false
      },
      "1249283253": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo1",
        "IsDefault": false
      },
      "3437259709": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo2",
        "IsDefault": false
      },
      "3197423398": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo3",
        "IsDefault": false
      },
      "1980349969": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo4",
        "IsDefault": false
      },
      "1219453777": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo5",
        "IsDefault": false
      },
      "2441508106": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo6",
        "IsDefault": false
      },
      "2220186280": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo7",
        "IsDefault": false
      },
      "457967755": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo8",
        "IsDefault": false
      },
      "235171324": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo9",
        "IsDefault": false
      },
      "42685294": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo10",
        "IsDefault": false
      },
      "3607349581": {
        "HashKey": "COMPONENT_COMBATMG_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_mg_combatmgmk2_camo_ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpgunrunning"
  },
  "177293209": {
    "HashKey": "WEAPON_HEAVYSNIPER_MK2",
    "NameGXT": "WT_SNIP_HVY2",
    "DescriptionGXT": "WTD_SNIP_HVY2",
    "Name": "Heavy Sniper Mk II",
    "Description": "Far away, yet always intimate: if you're looking for a secure foundation for that long-distance relationship, this is it.",
    "Group": "GROUP_SNIPER",
    "ModelHashKey": "w_sr_heavysnipermk2",
    "DefaultClipSize": 6,
    "Components": {
      "4196276776": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_sr_heavysnipermk2_mag1",
        "IsDefault": true
      },
      "752418717": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_sr_heavysnipermk2_mag2",
        "IsDefault": false
      },
      "247526935": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC_SN",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "w_sr_heavysnipermk2_mag_inc",
        "IsDefault": false
      },
      "4164277972": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CLIP_ARMORPIERCING",
        "NameGXT": "WCT_CLIP_AP",
        "DescriptionGXT": "WCD_CLIP_AP",
        "Name": "Armor Piercing Rounds",
        "Description": "Increased penetration of Body Armor. Reduced capacity.",
        "ModelHashKey": "w_sr_heavysnipermk2_mag_ap",
        "IsDefault": false
      },
      "1005144310": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "w_sr_heavysnipermk2_mag_fmj",
        "IsDefault": false
      },
      "2313935527": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CLIP_EXPLOSIVE",
        "NameGXT": "WCT_CLIP_EX",
        "DescriptionGXT": "WCD_CLIP_EX",
        "Name": "Explosive Rounds",
        "Description": "Bullets which explode on impact. Reduced capacity.",
        "ModelHashKey": "w_sr_heavysnipermk2_mag_ap2",
        "IsDefault": false
      },
      "2193687427": {
        "HashKey": "COMPONENT_AT_SCOPE_LARGE_MK2",
        "NameGXT": "WCT_SCOPE_LRG2",
        "DescriptionGXT": "WCD_SCOPE_LRG",
        "Name": "Zoom Scope",
        "Description": "Long-range zoom functionality.",
        "ModelHashKey": "w_at_scope_large",
        "IsDefault": false
      },
      "3159677559": {
        "HashKey": "COMPONENT_AT_SCOPE_MAX",
        "NameGXT": "WCT_SCOPE_MAX",
        "DescriptionGXT": "WCD_SCOPE_MAX",
        "Name": "Advanced Scope",
        "Description": "Maximum zoom functionality.",
        "ModelHashKey": "w_at_scope_max",
        "IsDefault": true
      },
      "3061846192": {
        "HashKey": "COMPONENT_AT_SCOPE_NV",
        "NameGXT": "WCT_SCOPE_NV",
        "DescriptionGXT": "WCD_SCOPE_NV",
        "Name": "Night Vision Scope",
        "Description": "Long-range zoom with toggleable night vision.",
        "ModelHashKey": "w_at_scope_nv",
        "IsDefault": false
      },
      "776198721": {
        "HashKey": "COMPONENT_AT_SCOPE_THERMAL",
        "NameGXT": "WCT_SCOPE_TH",
        "DescriptionGXT": "WCD_SCOPE_TH",
        "Name": "Thermal Scope",
        "Description": "Long-range zoom with toggleable thermal vision.",
        "ModelHashKey": "w_at_scope_nv",
        "IsDefault": false
      },
      "2890063729": {
        "HashKey": "COMPONENT_AT_SR_SUPP_03",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_SR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_sr_supp3",
        "IsDefault": false
      },
      "1602080333": {
        "HashKey": "COMPONENT_AT_MUZZLE_08",
        "NameGXT": "WCT_MUZZ8",
        "DescriptionGXT": "WCD_MUZZ_SR",
        "Name": "Squared Muzzle Brake",
        "Description": "Reduces recoil when firing.",
        "ModelHashKey": "w_at_muzzle_8_xm17",
        "IsDefault": false
      },
      "1764221345": {
        "HashKey": "COMPONENT_AT_MUZZLE_09",
        "NameGXT": "WCT_MUZZ9",
        "DescriptionGXT": "WCD_MUZZ_SR",
        "Name": "Bell-End Muzzle Brake",
        "Description": "Reduces recoil when firing.",
        "ModelHashKey": "w_at_muzzle_9",
        "IsDefault": false
      },
      "2425761975": {
        "HashKey": "COMPONENT_AT_SR_BARREL_01",
        "NameGXT": "WCT_BARR",
        "DescriptionGXT": "WCD_BARR",
        "Name": "Default Barrel",
        "Description": "Stock barrel attachment.",
        "ModelHashKey": "w_at_sr_barrel_1",
        "IsDefault": true
      },
      "277524638": {
        "HashKey": "COMPONENT_AT_SR_BARREL_02",
        "NameGXT": "WCT_BARR2",
        "DescriptionGXT": "WCD_BARR2",
        "Name": "Heavy Barrel",
        "Description": "Increases damage dealt to long-range targets.",
        "ModelHashKey": "w_at_sr_barrel_2",
        "IsDefault": false
      },
      "4164123906": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo1",
        "IsDefault": false
      },
      "3317620069": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo2",
        "IsDefault": false
      },
      "3916506229": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo3",
        "IsDefault": false
      },
      "329939175": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo4",
        "IsDefault": false
      },
      "643374672": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo5",
        "IsDefault": false
      },
      "807875052": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo6",
        "IsDefault": false
      },
      "2893163128": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo7",
        "IsDefault": false
      },
      "3198471901": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo8",
        "IsDefault": false
      },
      "3447155842": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo9",
        "IsDefault": false
      },
      "2881858759": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo10",
        "IsDefault": false
      },
      "1815270123": {
        "HashKey": "COMPONENT_HEAVYSNIPER_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_at_heavysnipermk2_camo_ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpgunrunning"
  },
  "3219281620": {
    "HashKey": "WEAPON_PISTOL_MK2",
    "NameGXT": "WT_PIST2",
    "DescriptionGXT": "WTD_PIST2",
    "Name": "Pistol Mk II",
    "Description": "Balance, simplicity, precision: nothing keeps the peace like an extended barrel in the other guy's mouth.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_pistolmk2",
    "DefaultClipSize": 12,
    "Components": {
      "2499030370": {
        "HashKey": "COMPONENT_PISTOL_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_pi_pistolmk2_mag1",
        "IsDefault": true
      },
      "1591132456": {
        "HashKey": "COMPONENT_PISTOL_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_pi_pistolmk2_mag2",
        "IsDefault": false
      },
      "634039983": {
        "HashKey": "COMPONENT_PISTOL_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun. Standard capacity.",
        "ModelHashKey": "w_pi_pistolmk2_mag_tr",
        "IsDefault": false
      },
      "733837882": {
        "HashKey": "COMPONENT_PISTOL_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "w_pi_pistolmk2_mag_inc",
        "IsDefault": false
      },
      "2248057097": {
        "HashKey": "COMPONENT_PISTOL_MK2_CLIP_HOLLOWPOINT",
        "NameGXT": "WCT_CLIP_HP",
        "DescriptionGXT": "WCD_CLIP_HP",
        "Name": "Hollow Point Rounds",
        "Description": "Increased damage to targets without Body Armor. Reduced capacity.",
        "ModelHashKey": "w_pi_pistolmk2_mag_hp",
        "IsDefault": false
      },
      "1329061674": {
        "HashKey": "COMPONENT_PISTOL_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "w_pi_pistolmk2_mag_fmj",
        "IsDefault": false
      },
      "2396306288": {
        "HashKey": "COMPONENT_AT_PI_RAIL",
        "NameGXT": "WCT_SCOPE_PI",
        "DescriptionGXT": "WCD_SCOPE_PI",
        "Name": "Mounted Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_pi_rail_1",
        "IsDefault": false
      },
      "1140676955": {
        "HashKey": "COMPONENT_AT_PI_FLSH_02",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_pi_flsh_2",
        "IsDefault": false
      },
      "1709866683": {
        "HashKey": "COMPONENT_AT_PI_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp_2",
        "IsDefault": false
      },
      "568543123": {
        "HashKey": "COMPONENT_AT_PI_COMP",
        "NameGXT": "WCT_COMP",
        "DescriptionGXT": "WCD_COMP",
        "Name": "Compensator",
        "Description": "Reduces recoil for rapid fire.",
        "ModelHashKey": "w_at_pi_comp_1",
        "IsDefault": false
      },
      "1550611612": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo1",
        "IsDefault": false
      },
      "368550800": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo2",
        "IsDefault": false
      },
      "2525897947": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo3",
        "IsDefault": false
      },
      "24902297": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo4",
        "IsDefault": false
      },
      "4066925682": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo5",
        "IsDefault": false
      },
      "3710005734": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo6",
        "IsDefault": false
      },
      "3141791350": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo7",
        "IsDefault": false
      },
      "1301287696": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo8",
        "IsDefault": false
      },
      "1597093459": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo9",
        "IsDefault": false
      },
      "1769871776": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo10",
        "IsDefault": false
      },
      "2467084625": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_pi_pistolmk2_camo_ind1",
        "IsDefault": false
      },
      "3036451504": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo1",
        "IsDefault": false
      },
      "438243936": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_02_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo2",
        "IsDefault": false
      },
      "3839888240": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_03_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo3",
        "IsDefault": false
      },
      "740920107": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_04_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo4",
        "IsDefault": false
      },
      "3753350949": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_05_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo5",
        "IsDefault": false
      },
      "1809261196": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_06_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo6",
        "IsDefault": false
      },
      "2648428428": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_07_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo7",
        "IsDefault": false
      },
      "3004802348": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_08_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo8",
        "IsDefault": false
      },
      "3330502162": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_09_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo9",
        "IsDefault": false
      },
      "1135718771": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_10_SLIDE",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Slide_Camo10",
        "IsDefault": false
      },
      "1253942266": {
        "HashKey": "COMPONENT_PISTOL_MK2_CAMO_IND_01_SLIDE",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "W_PI_PistolMK2_Camo_Sl_Ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpgunrunning"
  },
  "2024373456": {
    "HashKey": "WEAPON_SMG_MK2",
    "NameGXT": "WT_SMG2",
    "DescriptionGXT": "WTD_SMG2",
    "Name": "SMG Mk II",
    "Description": "Lightweight, compact, with a rate of fire to die very messily for: turn any confined space into a kill box at the click of a well-oiled trigger.",
    "Group": "GROUP_SMG",
    "ModelHashKey": "w_sb_smgmk2",
    "DefaultClipSize": 30,
    "Components": {
      "1277460590": {
        "HashKey": "COMPONENT_SMG_MK2_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for regular ammo.",
        "ModelHashKey": "w_sb_smgmk2_mag1",
        "IsDefault": true
      },
      "3112393518": {
        "HashKey": "COMPONENT_SMG_MK2_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for regular ammo.",
        "ModelHashKey": "w_sb_smgmk2_mag2",
        "IsDefault": false
      },
      "2146055916": {
        "HashKey": "COMPONENT_SMG_MK2_CLIP_TRACER",
        "NameGXT": "WCT_CLIP_TR",
        "DescriptionGXT": "WCD_CLIP_TR",
        "Name": "Tracer Rounds",
        "Description": "Bullets with bright visible markers that match the tint of the gun. Standard capacity.",
        "ModelHashKey": "w_sb_smgmk2_mag_tr",
        "IsDefault": false
      },
      "3650233061": {
        "HashKey": "COMPONENT_SMG_MK2_CLIP_INCENDIARY",
        "NameGXT": "WCT_CLIP_INC",
        "DescriptionGXT": "WCD_CLIP_INC",
        "Name": "Incendiary Rounds",
        "Description": "Bullets which include a chance to set targets on fire when shot. Reduced capacity.",
        "ModelHashKey": "w_sb_smgmk2_mag_inc",
        "IsDefault": false
      },
      "974903034": {
        "HashKey": "COMPONENT_SMG_MK2_CLIP_HOLLOWPOINT",
        "NameGXT": "WCT_CLIP_HP",
        "DescriptionGXT": "WCD_CLIP_HP",
        "Name": "Hollow Point Rounds",
        "Description": "Increased damage to targets without Body Armor. Reduced capacity.",
        "ModelHashKey": "w_sb_smgmk2_mag_hp",
        "IsDefault": false
      },
      "190476639": {
        "HashKey": "COMPONENT_SMG_MK2_CLIP_FMJ",
        "NameGXT": "WCT_CLIP_FMJ",
        "DescriptionGXT": "WCD_CLIP_FMJ",
        "Name": "Full Metal Jacket Rounds",
        "Description": "Increased damage to vehicles. Also penetrates bullet resistant and bulletproof vehicle glass. Reduced capacity.",
        "ModelHashKey": "w_sb_smgmk2_mag_fmj",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2681951826": {
        "HashKey": "COMPONENT_AT_SIGHTS_SMG",
        "NameGXT": "WCT_HOLO",
        "DescriptionGXT": "WCD_HOLO",
        "Name": "Holographic Sight",
        "Description": "Accurate sight for close quarters combat.",
        "ModelHashKey": "w_at_sights_smg",
        "IsDefault": false
      },
      "3842157419": {
        "HashKey": "COMPONENT_AT_SCOPE_MACRO_02_SMG_MK2",
        "NameGXT": "WCT_SCOPE_MAC2",
        "DescriptionGXT": "WCD_SCOPE_MAC",
        "Name": "Small Scope",
        "Description": "Standard-range zoom functionality.",
        "ModelHashKey": "w_at_scope_macro_2_mk2",
        "IsDefault": false
      },
      "1038927834": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL_SMG_MK2",
        "NameGXT": "WCT_SCOPE_SML2",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Medium Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small_mk2",
        "IsDefault": false
      },
      "3271853210": {
        "HashKey": "COMPONENT_AT_PI_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp",
        "IsDefault": false
      },
      "3113485012": {
        "HashKey": "COMPONENT_AT_MUZZLE_01",
        "NameGXT": "WCT_MUZZ1",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Flat Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_1",
        "IsDefault": false
      },
      "3362234491": {
        "HashKey": "COMPONENT_AT_MUZZLE_02",
        "NameGXT": "WCT_MUZZ2",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Tactical Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_2",
        "IsDefault": false
      },
      "3725708239": {
        "HashKey": "COMPONENT_AT_MUZZLE_03",
        "NameGXT": "WCT_MUZZ3",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Fat-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_3",
        "IsDefault": false
      },
      "3968886988": {
        "HashKey": "COMPONENT_AT_MUZZLE_04",
        "NameGXT": "WCT_MUZZ4",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Precision Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_4",
        "IsDefault": false
      },
      "48731514": {
        "HashKey": "COMPONENT_AT_MUZZLE_05",
        "NameGXT": "WCT_MUZZ5",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Heavy Duty Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_5",
        "IsDefault": false
      },
      "880736428": {
        "HashKey": "COMPONENT_AT_MUZZLE_06",
        "NameGXT": "WCT_MUZZ6",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Slanted Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_6",
        "IsDefault": false
      },
      "1303784126": {
        "HashKey": "COMPONENT_AT_MUZZLE_07",
        "NameGXT": "WCT_MUZZ7",
        "DescriptionGXT": "WCD_MUZZ",
        "Name": "Split-End Muzzle Brake",
        "Description": "Reduces recoil during rapid fire.",
        "ModelHashKey": "w_at_muzzle_7",
        "IsDefault": false
      },
      "3641720545": {
        "HashKey": "COMPONENT_AT_SB_BARREL_01",
        "NameGXT": "WCT_BARR",
        "DescriptionGXT": "WCD_BARR",
        "Name": "Default Barrel",
        "Description": "Stock barrel attachment.",
        "ModelHashKey": "w_at_sb_barrel_1",
        "IsDefault": true
      },
      "2774849419": {
        "HashKey": "COMPONENT_AT_SB_BARREL_02",
        "NameGXT": "WCT_BARR2",
        "DescriptionGXT": "WCD_BARR2",
        "Name": "Heavy Barrel",
        "Description": "Increases damage dealt to long-range targets.",
        "ModelHashKey": "w_at_sb_barrel_2",
        "IsDefault": false
      },
      "3298267239": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO",
        "NameGXT": "WCT_CAMO_1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Digital Camo",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo1",
        "IsDefault": false
      },
      "940943685": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_02",
        "NameGXT": "WCT_CAMO_2",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Brushstroke Camo",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo2",
        "IsDefault": false
      },
      "1263226800": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_03",
        "NameGXT": "WCT_CAMO_3",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Woodland Camo",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo3",
        "IsDefault": false
      },
      "3966931456": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_04",
        "NameGXT": "WCT_CAMO_4",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Skull",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo4",
        "IsDefault": false
      },
      "1224100642": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_05",
        "NameGXT": "WCT_CAMO_5",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Sessanta Nove",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo5",
        "IsDefault": false
      },
      "899228776": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_06",
        "NameGXT": "WCT_CAMO_6",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Perseus",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo6",
        "IsDefault": false
      },
      "616006309": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_07",
        "NameGXT": "WCT_CAMO_7",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Leopard",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo7",
        "IsDefault": false
      },
      "2733014785": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_08",
        "NameGXT": "WCT_CAMO_8",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Zebra",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo8",
        "IsDefault": false
      },
      "572063080": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_09",
        "NameGXT": "WCT_CAMO_9",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Geometric",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo9",
        "IsDefault": false
      },
      "1170588613": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_10",
        "NameGXT": "WCT_CAMO_10",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Boom!",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo10",
        "IsDefault": false
      },
      "966612367": {
        "HashKey": "COMPONENT_SMG_MK2_CAMO_IND_01",
        "NameGXT": "WCT_CAMO_IND",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Patriotic",
        "Description": "",
        "ModelHashKey": "w_at_smgmk2_camo_ind1",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WCT_TINT_0",
        "Name": "Classic Black"
      },
      {
        "NameGXT": "WCT_TINT_1",
        "Name": "Classic Gray"
      },
      {
        "NameGXT": "WCT_TINT_2",
        "Name": "Classic Two-Tone"
      },
      {
        "NameGXT": "WCT_TINT_3",
        "Name": "Classic White"
      },
      {
        "NameGXT": "WCT_TINT_4",
        "Name": "Classic Beige"
      },
      {
        "NameGXT": "WCT_TINT_5",
        "Name": "Classic Green"
      },
      {
        "NameGXT": "WCT_TINT_6",
        "Name": "Classic Blue"
      },
      {
        "NameGXT": "WCT_TINT_7",
        "Name": "Classic Earth"
      },
      {
        "NameGXT": "WCT_TINT_8",
        "Name": "Classic Brown & Black"
      },
      {
        "NameGXT": "WCT_TINT_9",
        "Name": "Red Contrast"
      },
      {
        "NameGXT": "WCT_TINT_10",
        "Name": "Blue Contrast"
      },
      {
        "NameGXT": "WCT_TINT_11",
        "Name": "Yellow Contrast"
      },
      {
        "NameGXT": "WCT_TINT_12",
        "Name": "Orange Contrast"
      },
      {
        "NameGXT": "WCT_TINT_13",
        "Name": "Bold Pink"
      },
      {
        "NameGXT": "WCT_TINT_14",
        "Name": "Bold Purple & Yellow"
      },
      {
        "NameGXT": "WCT_TINT_15",
        "Name": "Bold Orange"
      },
      {
        "NameGXT": "WCT_TINT_16",
        "Name": "Bold Green & Purple"
      },
      {
        "NameGXT": "WCT_TINT_17",
        "Name": "Bold Red Features"
      },
      {
        "NameGXT": "WCT_TINT_18",
        "Name": "Bold Green Features"
      },
      {
        "NameGXT": "WCT_TINT_19",
        "Name": "Bold Cyan Features"
      },
      {
        "NameGXT": "WCT_TINT_20",
        "Name": "Bold Yellow Features"
      },
      {
        "NameGXT": "WCT_TINT_21",
        "Name": "Bold Red & White"
      },
      {
        "NameGXT": "WCT_TINT_22",
        "Name": "Bold Blue & White"
      },
      {
        "NameGXT": "WCT_TINT_23",
        "Name": "Metallic Gold"
      },
      {
        "NameGXT": "WCT_TINT_24",
        "Name": "Metallic Platinum"
      },
      {
        "NameGXT": "WCT_TINT_25",
        "Name": "Metallic Gray & Lilac"
      },
      {
        "NameGXT": "WCT_TINT_26",
        "Name": "Metallic Purple & Lime"
      },
      {
        "NameGXT": "WCT_TINT_27",
        "Name": "Metallic Red"
      },
      {
        "NameGXT": "WCT_TINT_28",
        "Name": "Metallic Green"
      },
      {
        "NameGXT": "WCT_TINT_29",
        "Name": "Metallic Blue"
      },
      {
        "NameGXT": "WCT_TINT_30",
        "Name": "Metallic White & Aqua"
      },
      {
        "NameGXT": "WCT_TINT_31",
        "Name": "Metallic Red & Yellow"
      }
    ],
    "DLC": "mpgunrunning"
  },
  "2343591895": {
    "HashKey": "WEAPON_FLASHLIGHT",
    "NameGXT": "WT_FLASHLIGHT",
    "DescriptionGXT": "WTD_FLASHLIGHT",
    "Name": "Flashlight",
    "Description": "Intensify your fear of the dark with this short range, battery-powered light source. Handy for blunt force trauma. Part of The Halloween Surprise.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_flashlight",
    "DefaultClipSize": 0,
    "Components": {
      "3719772431": {
        "HashKey": "COMPONENT_FLASHLIGHT_LIGHT",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_me_flashlight_flash",
        "IsDefault": true
      }
    },
    "Tints": [],
    "DLC": "mphalloween"
  },
  "1198879012": {
    "HashKey": "WEAPON_FLAREGUN",
    "NameGXT": "WT_FLAREGUN",
    "DescriptionGXT": "WTD_FLAREGUN",
    "Name": "Flare Gun",
    "Description": "Use to signal distress or drunken excitement. Warning: pointing directly at individuals may cause spontaneous combustion. Part of The Heists Update.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_flaregun",
    "DefaultClipSize": 1,
    "Components": {
      "2481569177": {
        "HashKey": "COMPONENT_FLAREGUN_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCT_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "w_pi_flaregun_mag1",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINTDF",
        "Name": "Default tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpheist"
  },
  "2460120199": {
    "HashKey": "WEAPON_DAGGER",
    "NameGXT": "WT_DAGGER",
    "DescriptionGXT": "WTD_DAGGER",
    "Name": "Antique Cavalry Dagger",
    "Description": "You've been rocking the pirate-chic look for a while, but no vicious weapon to complete the look? Get this dagger with guarded hilt. Part of The \"I'm Not a Hipster\" Update.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_dagger",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "mphipster"
  },
  "137902532": {
    "HashKey": "WEAPON_VINTAGEPISTOL",
    "NameGXT": "WT_VPISTOL",
    "DescriptionGXT": "WTD_VPISTOL",
    "Name": "Vintage Pistol",
    "Description": "What you really need is a more recognizable gun. Stand out from the crowd at an armed robbery with this engraved pistol. Part of The \"I'm Not a Hipster\" Update.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "w_pi_vintage_pistol",
    "DefaultClipSize": 7,
    "Components": {
      "1168357051": {
        "HashKey": "COMPONENT_VINTAGEPISTOL_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_VPST_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Vintage Pistol.",
        "ModelHashKey": "w_pi_vintage_pistol_mag1",
        "IsDefault": true
      },
      "867832552": {
        "HashKey": "COMPONENT_VINTAGEPISTOL_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_VPST_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Vintage Pistol.",
        "ModelHashKey": "w_pi_vintage_pistol_mag2",
        "IsDefault": false
      },
      "3271853210": {
        "HashKey": "COMPONENT_AT_PI_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mphipster"
  },
  "2138347493": {
    "HashKey": "WEAPON_FIREWORK",
    "NameGXT": "WT_FIREWRK",
    "DescriptionGXT": "WTD_FIREWRK",
    "Name": "Firework Launcher",
    "Description": "Put the flair back in flare with this firework launcher, guaranteed to raise some oohs and aahs from the crowd. Part of the Independence Day Special.",
    "Group": "GROUP_HEAVY",
    "ModelHashKey": "w_lr_firework",
    "DefaultClipSize": 1,
    "Components": {
      "3840197261": {
        "HashKey": "COMPONENT_FIREWORK_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_FWRK_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Firework Launcher.",
        "ModelHashKey": "",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINTDF",
        "Name": "Default tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpindependence"
  },
  "2828843422": {
    "HashKey": "WEAPON_MUSKET",
    "NameGXT": "WT_MUSKET",
    "DescriptionGXT": "WTD_MUSKET",
    "Name": "Musket",
    "Description": "Armed with nothing but muskets and a superiority complex, the Brits took over half the world. Own the gun that built an empire. Part of the Independence Day Special.",
    "Group": "GROUP_SNIPER",
    "ModelHashKey": "w_ar_musket",
    "DefaultClipSize": 1,
    "Components": {
      "1322387263": {
        "HashKey": "COMPONENT_MUSKET_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_MSKT_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Musket.",
        "ModelHashKey": "p_w_ar_musket_chrg",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINTDF",
        "Name": "Default tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpindependence"
  },
  "3713923289": {
    "HashKey": "WEAPON_MACHETE",
    "NameGXT": "WT_MACHETE",
    "DescriptionGXT": "WTD_MACHETE",
    "Name": "Machete",
    "Description": "America's West African arms trade isn't just about giving. Rediscover the simple life with this rusty cleaver. Part of Lowriders.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_machette_lr",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "mplowrider"
  },
  "3675956304": {
    "HashKey": "WEAPON_MACHINEPISTOL",
    "NameGXT": "WT_MCHPIST",
    "DescriptionGXT": "WTD_MCHPIST",
    "Name": "Machine Pistol",
    "Description": "This fully automatic is the snare drum to your twin-engine V8 bass: no drive-by sounds quite right without it. Part of Lowriders.",
    "Group": "GROUP_SMG",
    "ModelHashKey": "w_sb_compactsmg",
    "DefaultClipSize": 12,
    "Components": {
      "1198425599": {
        "HashKey": "COMPONENT_MACHINEPISTOL_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_MCHP_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Machine Pistol.",
        "ModelHashKey": "w_sb_compactsmg_mag1",
        "IsDefault": true
      },
      "3106695545": {
        "HashKey": "COMPONENT_MACHINEPISTOL_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_MCHP_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Machine Pistol.",
        "ModelHashKey": "w_sb_compactsmg_mag2",
        "IsDefault": false
      },
      "2850671348": {
        "HashKey": "COMPONENT_MACHINEPISTOL_CLIP_03",
        "NameGXT": "WCT_CLIP_DRM",
        "DescriptionGXT": "WCD_CLIP3",
        "Name": "Drum Magazine",
        "Description": "Expanded capacity and slower reload.",
        "ModelHashKey": "w_sb_compactsmg_boxmag",
        "IsDefault": false
      },
      "3271853210": {
        "HashKey": "COMPONENT_AT_PI_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_PI_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_pi_supp",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mplowrider"
  },
  "1649403952": {
    "HashKey": "WEAPON_COMPACTRIFLE",
    "NameGXT": "WT_CMPRIFLE",
    "DescriptionGXT": "WTD_CMPRIFLE",
    "Name": "Compact Rifle",
    "Description": "Half the size, all the power, double the recoil: there's no riskier way to say \"I'm compensating for something\". Part of Lowriders: Custom Classics.",
    "Group": "GROUP_RIFLE",
    "ModelHashKey": "w_ar_assaultrifle_smg",
    "DefaultClipSize": 30,
    "Components": {
      "1363085923": {
        "HashKey": "COMPONENT_COMPACTRIFLE_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_CMPR_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Compact Rifle.",
        "ModelHashKey": "w_ar_assaultrifle_smg_mag1",
        "IsDefault": true
      },
      "1509923832": {
        "HashKey": "COMPONENT_COMPACTRIFLE_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_CMPR_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Compact Rifle.",
        "ModelHashKey": "w_ar_assaultrifle_smg_mag2",
        "IsDefault": false
      },
      "3322377230": {
        "HashKey": "COMPONENT_COMPACTRIFLE_CLIP_03",
        "NameGXT": "WCT_CLIP_DRM",
        "DescriptionGXT": "WCD_CLIP3",
        "Name": "Drum Magazine",
        "Description": "Expanded capacity and slower reload.",
        "ModelHashKey": "w_ar_assaultrifle_boxmag",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mplowrider2"
  },
  "4019527611": {
    "HashKey": "WEAPON_DBSHOTGUN",
    "NameGXT": "WT_DBSHGN",
    "DescriptionGXT": "WTD_DBSHGN",
    "Name": "Double Barrel Shotgun",
    "Description": "Do one thing, do it well. Who needs a high rate of fire when your first shot turns the other guy into a fine mist? Part of Lowriders: Custom Classics.",
    "Group": "GROUP_SHOTGUN",
    "ModelHashKey": "w_sg_doublebarrel",
    "DefaultClipSize": 2,
    "Components": {
      "703231006": {
        "HashKey": "COMPONENT_DBSHOTGUN_CLIP_01",
        "NameGXT": "WCT_INVALID",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "",
        "Description": "",
        "ModelHashKey": "w_sg_doublebarrel_mag1",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINTDF",
        "Name": "Default tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mplowrider2"
  },
  "984333226": {
    "HashKey": "WEAPON_HEAVYSHOTGUN",
    "NameGXT": "WT_HVYSHGN",
    "DescriptionGXT": "WTD_HVYSHGN",
    "Name": "Heavy Shotgun",
    "Description": "The weapon to reach for when you absolutely need to make a horrible mess of the room. Best used near easy-wipe surfaces only. Part of the Last Team Standing Update.",
    "Group": "GROUP_SHOTGUN",
    "ModelHashKey": "w_sg_heavyshotgun",
    "DefaultClipSize": 6,
    "Components": {
      "844049759": {
        "HashKey": "COMPONENT_HEAVYSHOTGUN_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_HVSG_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Heavy Shotgun.",
        "ModelHashKey": "w_sg_heavyshotgun_mag1",
        "IsDefault": true
      },
      "2535257853": {
        "HashKey": "COMPONENT_HEAVYSHOTGUN_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_HVSG_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Heavy Shotgun.",
        "ModelHashKey": "w_sg_heavyshotgun_mag2",
        "IsDefault": false
      },
      "2294798931": {
        "HashKey": "COMPONENT_HEAVYSHOTGUN_CLIP_03",
        "NameGXT": "WCT_CLIP_DRM",
        "DescriptionGXT": "WCD_CLIP3",
        "Name": "Drum Magazine",
        "Description": "Expanded capacity and slower reload.",
        "ModelHashKey": "w_sg_heavyshotgun_boxmag",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2805810788": {
        "HashKey": "COMPONENT_AT_AR_SUPP_02",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP2",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp_02",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mplts"
  },
  "3342088282": {
    "HashKey": "WEAPON_MARKSMANRIFLE",
    "NameGXT": "WT_MKRIFLE",
    "DescriptionGXT": "WTD_MKRIFLE",
    "Name": "Marksman Rifle",
    "Description": "Whether you're up close or a disconcertingly long way away, this weapon will get the job done. A multi-range tool for tools. Part of the Last Team Standing Update.",
    "Group": "GROUP_SNIPER",
    "ModelHashKey": "w_sr_marksmanrifle",
    "DefaultClipSize": 8,
    "Components": {
      "3627761985": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_MKRF_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Marksman Rifle.",
        "ModelHashKey": "w_sr_marksmanrifle_mag1",
        "IsDefault": true
      },
      "3439143621": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_MKRF_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Marksman Rifle.",
        "ModelHashKey": "w_sr_marksmanrifle_mag2",
        "IsDefault": false
      },
      "471997210": {
        "HashKey": "COMPONENT_AT_SCOPE_LARGE_FIXED_ZOOM",
        "NameGXT": "WCT_SCOPE_LRG",
        "DescriptionGXT": "WCD_SCOPE_LRF",
        "Name": "Scope",
        "Description": "Long-range fixed zoom functionality.",
        "ModelHashKey": "w_at_scope_large",
        "IsDefault": true
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "2205435306": {
        "HashKey": "COMPONENT_AT_AR_SUPP",
        "NameGXT": "WCT_SUPP",
        "DescriptionGXT": "WCD_AR_SUPP",
        "Name": "Suppressor",
        "Description": "Reduces noise and muzzle flash.",
        "ModelHashKey": "w_at_ar_supp",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      },
      "371102273": {
        "HashKey": "COMPONENT_MARKSMANRIFLE_VARMOD_LUXE",
        "NameGXT": "WCT_VAR_GOLD",
        "DescriptionGXT": "WCD_VAR_MKRF",
        "Name": "Yusuf Amir Luxury Finish",
        "Description": "",
        "ModelHashKey": "W_SR_MarksmanRifle_Luxe",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mplts"
  },
  "171789620": {
    "HashKey": "WEAPON_COMBATPDW",
    "NameGXT": "WT_COMBATPDW",
    "DescriptionGXT": "WTD_COMBATPDW",
    "Name": "Combat PDW",
    "Description": "Who said personal weaponry couldn't be worthy of military personnel? Thanks to our lobbyists, not Congress. Integral suppressor. Part of the Ill-Gotten Gains Update Part 1.",
    "Group": "GROUP_SMG",
    "ModelHashKey": "W_SB_PDW",
    "DefaultClipSize": 30,
    "Components": {
      "1125642654": {
        "HashKey": "COMPONENT_COMBATPDW_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_PDW_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Combat PDW.",
        "ModelHashKey": "W_SB_PDW_Mag1",
        "IsDefault": true
      },
      "860508675": {
        "HashKey": "COMPONENT_COMBATPDW_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_PDW_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Combat PDW.",
        "ModelHashKey": "W_SB_PDW_Mag2",
        "IsDefault": false
      },
      "1857603803": {
        "HashKey": "COMPONENT_COMBATPDW_CLIP_03",
        "NameGXT": "WCT_CLIP_DRM",
        "DescriptionGXT": "WCD_CLIP3",
        "Name": "Drum Magazine",
        "Description": "Expanded capacity and slower reload.",
        "ModelHashKey": "w_sb_pdw_boxmag",
        "IsDefault": false
      },
      "2076495324": {
        "HashKey": "COMPONENT_AT_AR_FLSH",
        "NameGXT": "WCT_FLASH",
        "DescriptionGXT": "WCD_FLASH",
        "Name": "Flashlight",
        "Description": "Aids low light target acquisition.",
        "ModelHashKey": "w_at_ar_flsh",
        "IsDefault": false
      },
      "202788691": {
        "HashKey": "COMPONENT_AT_AR_AFGRIP",
        "NameGXT": "WCT_GRIP",
        "DescriptionGXT": "WCD_GRIP",
        "Name": "Grip",
        "Description": "Improves weapon accuracy.",
        "ModelHashKey": "w_at_ar_afgrip",
        "IsDefault": false
      },
      "2855028148": {
        "HashKey": "COMPONENT_AT_SCOPE_SMALL",
        "NameGXT": "WCT_SCOPE_SML",
        "DescriptionGXT": "WCD_SCOPE_SML",
        "Name": "Scope",
        "Description": "Medium-range zoom functionality.",
        "ModelHashKey": "w_at_scope_small",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpluxe"
  },
  "3638508604": {
    "HashKey": "WEAPON_KNUCKLE",
    "NameGXT": "WT_KNUCKLE",
    "DescriptionGXT": "WTD_KNUCKLE",
    "Name": "Knuckle Duster",
    "Description": "Perfect for knocking out gold teeth, or as a gift to the trophy partner who has everything. Part of The Ill-Gotten Gains Update Part 2.",
    "Group": "GROUP_UNARMED",
    "ModelHashKey": "W_ME_Knuckle",
    "DefaultClipSize": 0,
    "Components": {
      "4081463091": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_BASE",
        "NameGXT": "WCT_KNUCK_01",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "Base Model",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle",
        "IsDefault": false
      },
      "3323197061": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_PIMP",
        "NameGXT": "WCT_KNUCK_02",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The Pimp",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_02",
        "IsDefault": false
      },
      "4007263587": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_BALLAS",
        "NameGXT": "WCT_KNUCK_BG",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The Ballas",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_BG",
        "IsDefault": false
      },
      "1351683121": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_DOLLAR",
        "NameGXT": "WCT_KNUCK_DLR",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The Hustler",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_DLR",
        "IsDefault": false
      },
      "2539772380": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_DIAMOND",
        "NameGXT": "WCT_KNUCK_DMD",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The Rock",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_DMD",
        "IsDefault": false
      },
      "2112683568": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_HATE",
        "NameGXT": "WCT_KNUCK_HT",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The Hater",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_HT",
        "IsDefault": false
      },
      "1062111910": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_LOVE",
        "NameGXT": "WCT_KNUCK_LV",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The Lover",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_LV",
        "IsDefault": false
      },
      "146278587": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_PLAYER",
        "NameGXT": "WCT_KNUCK_PC",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The Player",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_PC",
        "IsDefault": false
      },
      "3800804335": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_KING",
        "NameGXT": "WCT_KNUCK_SLG",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The King",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_SLG",
        "IsDefault": false
      },
      "2062808965": {
        "HashKey": "COMPONENT_KNUCKLE_VARMOD_VAGOS",
        "NameGXT": "WCT_KNUCK_VG",
        "DescriptionGXT": "WCD_VAR_DESC",
        "Name": "The Vagos",
        "Description": "",
        "ModelHashKey": "W_ME_Knuckle_VG",
        "IsDefault": false
      }
    },
    "Tints": [],
    "DLC": "mpluxe2"
  },
  "3696079510": {
    "HashKey": "WEAPON_MARKSMANPISTOL",
    "NameGXT": "WT_MKPISTOL",
    "DescriptionGXT": "WTD_MKPISTOL",
    "Name": "Marksman Pistol",
    "Description": "Not for the risk averse. Make it count as you'll be reloading as much as you shoot. Part of The Ill-Gotten Gains Update Part 2.",
    "Group": "GROUP_PISTOL",
    "ModelHashKey": "W_PI_SingleShot",
    "DefaultClipSize": 1,
    "Components": {
      "3416146413": {
        "HashKey": "COMPONENT_MARKSMANPISTOL_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_INVALID",
        "Name": "Default Clip",
        "Description": "",
        "ModelHashKey": "W_PI_SingleShot_Shell",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINTDF",
        "Name": "Default tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpluxe2"
  },
  "1627465347": {
    "HashKey": "WEAPON_GUSENBERG",
    "NameGXT": "WT_GUSNBRG",
    "DescriptionGXT": "WTD_GUSNBRG",
    "Name": "Gusenberg Sweeper",
    "Description": "Complete your look with a Prohibition gun. Looks great being fired from an Albany Roosevelt or paired with a pinstripe suit. Part of the Valentine's Day Massacre Special.",
    "Group": "GROUP_MG",
    "ModelHashKey": "w_sb_gusenberg",
    "DefaultClipSize": 30,
    "Components": {
      "484812453": {
        "HashKey": "COMPONENT_GUSENBERG_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_GSNB_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Gusenberg Sweeper.",
        "ModelHashKey": "w_sb_gusenberg_mag1",
        "IsDefault": true
      },
      "3939025520": {
        "HashKey": "COMPONENT_GUSENBERG_CLIP_02",
        "NameGXT": "WCT_CLIP2",
        "DescriptionGXT": "WCD_GSNB_CLIP2",
        "Name": "Extended Clip",
        "Description": "Extended capacity for Gusenberg Sweeper.",
        "ModelHashKey": "w_sb_gusenberg_mag2",
        "IsDefault": false
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "mpvalentines"
  },
  "4191993645": {
    "HashKey": "WEAPON_HATCHET",
    "NameGXT": "WT_HATCHET",
    "DescriptionGXT": "WTD_HATCHET",
    "Name": "Hatchet",
    "Description": "Make kindling... of your pals with this easy to wield, easy to hide hatchet. Exclusive content for returning players.",
    "Group": "GROUP_MELEE",
    "ModelHashKey": "w_me_hatchet",
    "DefaultClipSize": 0,
    "Components": {},
    "Tints": [],
    "DLC": "spupgrade"
  },
  "1834241177": {
    "HashKey": "WEAPON_RAILGUN",
    "NameGXT": "WT_RAILGUN",
    "DescriptionGXT": "WTD_RAILGUN",
    "Name": "Railgun",
    "Description": "All you need to know is - magnets, and it does horrible things to the things it's pointed at. Exclusive content for returning players.",
    "Group": "GROUP_HEAVY",
    "ModelHashKey": "w_ar_railgun",
    "DefaultClipSize": 1,
    "Components": {
      "59044840": {
        "HashKey": "COMPONENT_RAILGUN_CLIP_01",
        "NameGXT": "WCT_CLIP1",
        "DescriptionGXT": "WCD_RLGN_CLIP1",
        "Name": "Default Clip",
        "Description": "Standard capacity for Railgun.",
        "ModelHashKey": "w_ar_railgun_mag1",
        "IsDefault": true
      }
    },
    "Tints": [
      {
        "NameGXT": "WM_TINT0",
        "Name": "Black tint"
      },
      {
        "NameGXT": "WM_TINT1",
        "Name": "Green tint"
      },
      {
        "NameGXT": "WM_TINT2",
        "Name": "Gold tint"
      },
      {
        "NameGXT": "WM_TINT3",
        "Name": "Pink tint"
      },
      {
        "NameGXT": "WM_TINT4",
        "Name": "Army tint"
      },
      {
        "NameGXT": "WM_TINT5",
        "Name": "LSPD tint"
      },
      {
        "NameGXT": "WM_TINT6",
        "Name": "Orange tint"
      },
      {
        "NameGXT": "WM_TINT7",
        "Name": "Platinum tint"
      }
    ],
    "DLC": "spupgrade"
  }
}
},{}],14:[function(require,module,exports){
const weaponData=require("./weaponData"),PistolAttachmentPos=new mp.Vector3(.02,.06,.1),PistolAttachmentRot=new mp.Vector3(-100,0,0),SMGAttachmentPos=new mp.Vector3(.08,.03,-.1),SMGAttachmentRot=new mp.Vector3(-80.77,0,0),ShotgunAttachmentPos=new mp.Vector3(-.1,-.15,.11),ShotgunAttachmentRot=new mp.Vector3(-180,0,0),RifleAttachmentPos=new mp.Vector3(-.1,-.15,-.13),RifleAttachmentRot=new mp.Vector3(0,0,3.5),weaponAttachmentData={WEAPON_PISTOL:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_PISTOL_MK2:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_COMBATPISTOL:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_APPISTOL:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_STUNGUN:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_PISTOL50:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_SNSPISTOL:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_SNSPISTOL_MK2:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_HEAVYPISTOL:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_VINTAGEPISTOL:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_REVOLVER:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_REVOLVER_MK2:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_DOUBLEACTION:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_RAYPISTOL:{Slot:"RIGHT_THIGH",AttachBone:51826,AttachPosition:PistolAttachmentPos,AttachRotation:PistolAttachmentRot},WEAPON_MICROSMG:{Slot:"LEFT_THIGH",AttachBone:58271,AttachPosition:SMGAttachmentPos,AttachRotation:SMGAttachmentRot},WEAPON_SMG:{Slot:"LEFT_THIGH",AttachBone:58271,AttachPosition:SMGAttachmentPos,AttachRotation:SMGAttachmentRot},WEAPON_SMG_MK2:{Slot:"LEFT_THIGH",AttachBone:58271,AttachPosition:SMGAttachmentPos,AttachRotation:SMGAttachmentRot},WEAPON_ASSAULTSMG:{Slot:"LEFT_THIGH",AttachBone:58271,AttachPosition:SMGAttachmentPos,AttachRotation:SMGAttachmentRot},WEAPON_COMBATPDW:{Slot:"LEFT_THIGH",AttachBone:58271,AttachPosition:SMGAttachmentPos,AttachRotation:SMGAttachmentRot},WEAPON_MACHINEPISTOL:{Slot:"LEFT_THIGH",AttachBone:58271,AttachPosition:SMGAttachmentPos,AttachRotation:SMGAttachmentRot},WEAPON_MINISMG:{Slot:"LEFT_THIGH",AttachBone:58271,AttachPosition:SMGAttachmentPos,AttachRotation:SMGAttachmentRot},WEAPON_PUMPSHOTGUN:{Slot:"LEFT_BACK",AttachBone:24818,AttachPosition:ShotgunAttachmentPos,AttachRotation:ShotgunAttachmentRot},WEAPON_PUMPSHOTGUN_MK2:{Slot:"LEFT_BACK",AttachBone:24818,AttachPosition:ShotgunAttachmentPos,AttachRotation:ShotgunAttachmentRot},WEAPON_SAWNOFFSHOTGUN:{Slot:"LEFT_BACK",AttachBone:24818,AttachPosition:ShotgunAttachmentPos,AttachRotation:ShotgunAttachmentRot},WEAPON_ASSAULTSHOTGUN:{Slot:"LEFT_BACK",AttachBone:24818,AttachPosition:ShotgunAttachmentPos,AttachRotation:ShotgunAttachmentRot},WEAPON_BULLPUPSHOTGUN:{Slot:"LEFT_BACK",AttachBone:24818,AttachPosition:ShotgunAttachmentPos,AttachRotation:ShotgunAttachmentRot},WEAPON_HEAVYSHOTGUN:{Slot:"LEFT_BACK",AttachBone:24818,AttachPosition:ShotgunAttachmentPos,AttachRotation:ShotgunAttachmentRot},WEAPON_ASSAULTRIFLE:{Slot:"RIGHT_BACK",AttachBone:24818,AttachPosition:RifleAttachmentPos,AttachRotation:RifleAttachmentRot},WEAPON_ASSAULTRIFLE_MK2:{Slot:"RIGHT_BACK",AttachBone:24818,AttachPosition:RifleAttachmentPos,AttachRotation:RifleAttachmentRot},WEAPON_CARBINERIFLE:{Slot:"RIGHT_BACK",AttachBone:24818,AttachPosition:RifleAttachmentPos,AttachRotation:RifleAttachmentRot},WEAPON_CARBINERIFLE_MK2:{Slot:"RIGHT_BACK",AttachBone:24818,AttachPosition:RifleAttachmentPos,AttachRotation:RifleAttachmentRot},WEAPON_SPECIALCARBINE:{Slot:"RIGHT_BACK",AttachBone:24818,AttachPosition:RifleAttachmentPos,AttachRotation:RifleAttachmentRot},WEAPON_SPECIALCARBINE_MK2:{Slot:"RIGHT_BACK",AttachBone:24818,AttachPosition:RifleAttachmentPos,AttachRotation:RifleAttachmentRot},WEAPON_MARKSMANRIFLE:{Slot:"RIGHT_BACK",AttachBone:24818,AttachPosition:RifleAttachmentPos,AttachRotation:RifleAttachmentRot},WEAPON_MARKSMANRIFLE_MK2:{Slot:"RIGHT_BACK",AttachBone:24818,AttachPosition:RifleAttachmentPos,AttachRotation:RifleAttachmentRot}};for(let t in weaponAttachmentData){let o=mp.game.joaat(t);weaponData[o]?(weaponAttachmentData[t].AttachName=`WDSP_${weaponData[o].HashKey}`,weaponAttachmentData[t].AttachModel=weaponData[o].ModelHashKey):console.log(`[!] ${t} not found in weapon data file and will cause issues, remove it from weaponAttachmentData.`)}for(let t in weaponAttachmentData)console.log(weaponAttachmentData[t].AttachName,weaponAttachmentData[t].AttachModel),mp.attachmentMngr.register(weaponAttachmentData[t].AttachName,weaponAttachmentData[t].AttachModel,weaponAttachmentData[t].AttachBone,weaponAttachmentData[t].AttachPosition,weaponAttachmentData[t].AttachRotation);

},{"./weaponData":13}],15:[function(require,module,exports){
var LastCam,natives=require("./natives.js"),CEFInterface=require("./browser.js").interface,CEFInventory=require("./browser.js").inventory,CEFNotification=require("./browser.js").notification;function clearBlips(){natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT(!0);let e=natives.GET_FIRST_BLIP_INFO_ID(5);for(;natives.DOES_BLIP_EXIST(e);)mp.game.ui.removeBlip(e),e=natives.GET_NEXT_BLIP_INFO_ID(5);mp.game.wait(50)}CEFInterface.load("login/index.html"),mp.gui.chat.show(!1),mp.events.callRemote("ServerAccount:Ready"),mp.game.graphics.transitionToBlurred(1),mp.events.add("Server:RequestLogin",()=>{clearBlips(),mp.players.local.position=new mp.Vector3(2927.993408203125,5618.33544921875,244.45285034179688),mp.players.local.setAlpha(0),mp.defaultCam=mp.cameras.new("default",new mp.Vector3(2927.993408203125,5618.33544921875,244.45285034179688),new mp.Vector3,70),mp.defaultCam.pointAtCoord(2906.989501953125,5563.49267578125,245.226806640625),mp.defaultCam.setActive(!0),mp.game.cam.renderScriptCams(!0,!1,0,!0,!1),mp.game.ui.displayHud(!1),mp.game.ui.displayRadar(!1),mp.game.graphics.transitionToBlurred(1),CEFInterface.cursor(!0),setTimeout(function(){CEFInterface.call("cef_loadlogin",mp.players.local.name)},100)}),mp.events.add("Account:Alert",function(...e){CEFInterface.call("alert_login",e[0])}),mp.events.add("Account:HideLogin",()=>{mp.game.graphics.transitionFromBlurred(500),CEFInterface.cursor(!1),CEFInterface.call("cef_hidelogin")}),mp.events.add("Account:LoginDone",()=>{mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setHealthRechargeMultiplier(0),mp.game.ui.displayRadar(!0),mp.game.ui.displayHud(!0),mp.game.ui.setMinimapVisible(!1),mp.gui.chat.show(!0)}),mp.events.add("Cam:Hide",()=>{mp.game.graphics.transitionFromBlurred(100),mp.game.ui.displayRadar(!0),mp.game.ui.displayHud(!0),mp.game.ui.setMinimapVisible(!1),mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setHealthRechargeMultiplier(0),mp.players.local.freezePosition(!1),mp.game.cam.renderScriptCams(!1,!1,0,!0,!1),mp.game.cam.doScreenFadeIn(1e3)}),mp.events.add("entityStreamIn",e=>{"player"===e.type&&(mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setLockonRangeOverride(0))}),mp.events.add("Account:Login",(e,a)=>{mp.events.callRemote("ServerAccount:Login",e,a)}),mp.events.add("Account:Register",(e,a,r)=>{mp.events.callRemote("ServerAccount:Register",e,a,r)});

},{"./browser.js":1,"./natives.js":17}],16:[function(require,module,exports){
var materials={2379541433:1,127813971:2,3454750755:2};module.exports=materials;

},{}],17:[function(require,module,exports){
var natives={};mp.game.vehicle.getVehicleSeats=(e=>mp.game.invoke("0xA7C4F2C6E744A550",e.handle)),mp.game.graphics.clearDrawOrigin=(()=>mp.game.invoke("0xFF0B610F6BE0D7AF")),natives.START_PLAYER_TELEPORT=((e,E,_,a,i,m,n,v)=>mp.game.invoke("0xAD15F075A4DA0FDE",e,E,_,a,i,m,n,v)),natives.CHANGE_PLAYER_PED=((e,E,_)=>mp.game.invoke("0x048189FAC643DEEE",e,E,_)),natives.SET_PED_CURRENT_WEAPON_VISIBLE=((e,E,_,a,i)=>mp.game.invoke("0x0725A4CCFDED9A70",e,E,_,a,i)),natives.SET_BLIP_SPRITE=((e,E)=>mp.game.invoke("0xDF735600A4696DAF",e,E)),natives.SET_BLIP_ALPHA=((e,E)=>mp.game.invoke("0x45FF974EEE1C8734",e,E)),natives.SET_BLIP_COLOUR=((e,E)=>mp.game.invoke("0x03D7FB09E75D6B7E",e,E)),natives.SET_BLIP_ROTATION=((e,E)=>mp.game.invoke("0xF87683CDF73C3F6E",e,E)),natives.SET_BLIP_FLASHES=((e,E)=>mp.game.invoke("0xB14552383D39CE3E",e,E)),natives.SET_BLIP_FLASH_TIMER=((e,E)=>mp.game.invoke("0xD3CD6FD297AE87CC",e,E)),natives.SET_BLIP_COORDS=((e,E,_,a)=>mp.game.invoke("0xAE2AF67E9D9AF65D",e,E,_,a)),natives.SET_CURSOR_LOCATION=((e,E)=>mp.game.invoke("0xFC695459D4D0E219",e,E)),natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT=(e=>mp.game.invoke("0xB98236CAAECEF897",e)),natives.GET_FIRST_BLIP_INFO_ID=(e=>mp.game.invoke("0x1BEDE233E6CD2A1F",e)),natives.GET_NEXT_BLIP_INFO_ID=(e=>mp.game.invoke("0x14F96AA50D6FBEA7",e)),natives.DOES_BLIP_EXIST=(e=>mp.game.invoke("0xA6DB27D19ECBB7DA",e)),natives.GET_NUMBER_OF_ACTIVE_BLIPS=(()=>mp.game.invoke("0x9A3FF3DE163034E8")),natives.SET_BLIP_SCALE=((e,E)=>mp.game.invoke("0xD38744167B2FA257",e,E)),natives.SET_ENTITY_NO_COLLISION_ENTITY=((e,E,_)=>mp.game.invoke("0xA53ED5520C07654A",e.handle,E.handle,_)),natives.GET_CLOSEST_OBJECT_OF_TYPE=((e,E,_,a,i,m,n,v)=>mp.game.invoke("0xE143FA2249364369",e,E,_,a,i,m,n,v)),natives.DOES_OBJECT_OF_TYPE_EXIST_AT_COORDS=((e,E,_,a,i,m)=>mp.game.invoke("0xBFA48E2FF417213F",e,E,_,a,i,m)),module.exports=natives;

},{}],18:[function(require,module,exports){
var Notifications=new class{constructor(){let t=this;this._renderObjects=[],this._smoothing=1/120,mp.events.add("render",()=>{t.render()})}render(){let t=this;t._renderObjects.forEach(function(e,r){let o=mp.vector(e.start),c=mp.vector(e.end),n=o.lerp(c,e.t);e.color[3]=200*(1-e.t/1.4),mp.game.graphics.drawText(e.text,[n.x,n.y,n.z],{font:4,color:e.color,scale:[.3,.3],outline:!0,centre:!0}),e.t+=t._smoothing,(e.t>=1||e.color[3]<0)&&t._renderObjects.splice(r,1)})}notify3D(t,e,r,o,c,n,s="NO",i=[255,255,255]){this._renderObjects.push({start:new mp.Vector3(t,e,r),end:new mp.Vector3(o,c,n),t:0,text:s,color:i})}};module.exports=Notifications;

},{}],19:[function(require,module,exports){
var offsets={sr_prop_sr_boxwood_01:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)},prop_box_wood04a:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}};module.exports=offsets;

},{}],20:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");let bigMessageScaleform=null,bigMsgInit=0,bigMsgDuration=5e3,bigMsgAnimatedOut=!1;mp.events.add("ShowWeaponPurchasedMessage",(e,g,s,a=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_WEAPON_PURCHASED",e,g,s),bigMsgInit=Date.now(),bigMsgDuration=a,bigMsgAnimatedOut=!1}),mp.events.add("ShowPlaneMessage",(e,g,s,a=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_PLANE_MESSAGE",e,g,s),bigMsgInit=Date.now(),bigMsgDuration=a,bigMsgAnimatedOut=!1}),mp.events.add("ShowShardMessage",(e,g,s,a,i=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_SHARD_CENTERED_MP_MESSAGE",e,g,s,a),bigMsgInit=Date.now(),bigMsgDuration=i,bigMsgAnimatedOut=!1}),mp.events.add("render",()=>{null!=bigMessageScaleform&&(bigMessageScaleform.renderFullscreen(),bigMsgInit>0&&Date.now()-bigMsgInit>bigMsgDuration&&(bigMsgAnimatedOut?(bigMsgInit=0,bigMessageScaleform.dispose(),bigMessageScaleform=null):(bigMessageScaleform.callFunction("TRANSITION_OUT"),bigMsgAnimatedOut=!0,bigMsgDuration+=750)))});

},{"./Scaleform.js":23}],21:[function(require,module,exports){
class InstructionButtons{constructor(){for(this.handle=mp.game.graphics.requestScaleformMovie("instructional_buttons"),this.ScIndex=0;!mp.game.graphics.hasScaleformMovieLoaded(this.handle);)mp.game.wait(0)}InitButtons(e,a,i){this.ScIndex=0,mp.game.graphics.drawScaleformMovieFullscreen(this.handle,255,255,255,0,!1),mp.game.graphics.pushScaleformMovieFunction(this.handle,"CLEAR_ALL"),mp.game.graphics.popScaleformMovieFunctionVoid(),mp.game.graphics.pushScaleformMovieFunction(this.handle,"SET_CLEAR_SPACE"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(200),mp.game.graphics.popScaleformMovieFunctionVoid()}AddButton(e,a){"number"==typeof a?(mp.game.graphics.pushScaleformMovieFunction(this.handle,"SET_DATA_SLOT"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(this.ScIndex),mp.game.graphics.pushScaleformMovieFunctionParameterInt(a),mp.game.graphics.pushScaleformMovieFunctionParameterString(e),mp.game.graphics.popScaleformMovieFunctionVoid(),this.ScIndex++):(mp.game.graphics.pushScaleformMovieFunction(this.handle,"SET_DATA_SLOT"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(this.ScIndex),mp.game.graphics.pushScaleformMovieFunctionParameterString(a),mp.game.graphics.pushScaleformMovieFunctionParameterString(e),mp.game.graphics.popScaleformMovieFunctionVoid(),this.ScIndex++)}finalizeButtons(e=1,a,i,o,m){mp.game.graphics.pushScaleformMovieFunction(this.handle,"DRAW_INSTRUCTIONAL_BUTTONS"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(e),mp.game.graphics.popScaleformMovieFunctionVoid(),mp.game.graphics.pushScaleformMovieFunction(this.handle,"SET_BACKGROUND_COLOUR"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(a),mp.game.graphics.pushScaleformMovieFunctionParameterInt(i),mp.game.graphics.pushScaleformMovieFunctionParameterInt(o),mp.game.graphics.pushScaleformMovieFunctionParameterInt(m),mp.game.graphics.popScaleformMovieFunctionVoid()}}module.exports=new InstructionButtons;

},{}],22:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");let midsizedMessageScaleform=null,msgInit=0,msgDuration=5e3,msgAnimatedOut=!1,msgBgColor=0;mp.events.add("ShowMidsizedMessage",(e,s,m=5e3)=>{null==midsizedMessageScaleform&&(midsizedMessageScaleform=new messageScaleform("midsized_message")),midsizedMessageScaleform.callFunction("SHOW_MIDSIZED_MESSAGE",e,s),msgInit=Date.now(),msgDuration=m,msgAnimatedOut=!1}),mp.events.add("ShowMidsizedShardMessage",(e,s,m,a,i,d=5e3)=>{null==midsizedMessageScaleform&&(midsizedMessageScaleform=new messageScaleform("midsized_message")),midsizedMessageScaleform.callFunction("SHOW_SHARD_MIDSIZED_MESSAGE",e,s,m,a,i),msgInit=Date.now(),msgDuration=d,msgAnimatedOut=!1,msgBgColor=m}),mp.events.add("render",()=>{null!=midsizedMessageScaleform&&(midsizedMessageScaleform.renderFullscreen(),msgInit>0&&Date.now()-msgInit>msgDuration&&(msgAnimatedOut?(msgInit=0,midsizedMessageScaleform.dispose(),midsizedMessageScaleform=null):(midsizedMessageScaleform.callFunction("SHARD_ANIM_OUT",msgBgColor),msgAnimatedOut=!0,msgDuration+=750)))});

},{"./Scaleform.js":23}],23:[function(require,module,exports){
class BasicScaleform{constructor(e){for(this.handle=mp.game.graphics.requestScaleformMovie(e);!mp.game.graphics.hasScaleformMovieLoaded(this.handle);)mp.game.wait(0)}callFunction(e,...a){mp.game.graphics.pushScaleformMovieFunction(this.handle,e),a.forEach(e=>{switch(typeof e){case"string":mp.game.graphics.pushScaleformMovieFunctionParameterString(e);break;case"boolean":mp.game.graphics.pushScaleformMovieFunctionParameterBool(e);break;case"number":Number(e)===e&&e%1!=0?mp.game.graphics.pushScaleformMovieFunctionParameterFloat(e):mp.game.graphics.pushScaleformMovieFunctionParameterInt(e)}}),mp.game.graphics.popScaleformMovieFunctionVoid()}renderFullscreen(){mp.game.graphics.drawScaleformMovieFullscreen(this.handle,255,255,255,255,!1)}dispose(){mp.game.graphics.setScaleformMovieAsNoLongerNeeded(this.handle)}}module.exports=BasicScaleform;

},{}],24:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");require("./BigMessage.js"),require("./MidsizedMessage.js"),mp.game.ui.instructionalButtons=require("./InstructionButtons.js"),mp.game.ui.messages={showShard:(e,s,a,i,r=5e3)=>mp.events.call("ShowShardMessage",e,s,a,i,r),showWeaponPurchased:(e,s,a,i=5e3)=>mp.events.call("ShowWeaponPurchasedMessage",e,s,a,i),showPlane:(e,s,a,i=5e3)=>mp.events.call("ShowPlaneMessage",e,s,a,i),showMidsized:(e,s,a=5e3)=>mp.events.call("ShowMidsizedMessage",e,s,a),showMidsizedShard:(e,s,a,i,r,o=5e3)=>mp.events.call("ShowMidsizedShardMessage",e,s,a,i,r,o)};

},{"./BigMessage.js":20,"./InstructionButtons.js":21,"./MidsizedMessage.js":22,"./Scaleform.js":23}],25:[function(require,module,exports){
var cell_size=40,padding=5,inv_cells=6,inv_rows=5,TempStorage=[],CEFInventory=require("./browser.js").inventory,CEFNotification=require("./browser.js").notification,ScreenResolution=mp.game.graphics.getScreenActiveResolution(0,0);CEFInventory.load("interface/index.html");let clientWidth=cell_size*inv_cells+2*padding,clientHeight=cell_size*inv_rows+37+2*padding;var Inventory_Order={positions:{inventory:{top:`calc(50% - ${clientHeight/2}px)`,left:`calc(50% - ${clientWidth/2}px)`},equipment:{top:"20%",left:"15%"}},items:{}};if(mp.storage.data.inventory_order){let e=mp.storage.data.inventory_order;Inventory_Order.positions=e.positions||{inventory:{top:`calc(50% - ${clientHeight/2}px)`,left:`calc(50% - ${clientWidth/2}px)`},equipment:{top:"20%",left:"15%"}},Inventory_Order.items=e.items||{}}else mp.storage.data.inventory_order=Inventory_Order;mp.events.add("Inventory:Resize",(e,t)=>{inv_cells=e,inv_rows=t,CEFInventory.call("resize","inventory",inv_cells,inv_rows)}),mp.events.add("Inventory:Ready",e=>{CEFInventory.call("initialize","inventory",inv_cells,inv_rows,{top:Inventory_Order.positions.inventory.top,left:Inventory_Order.positions.inventory.left})});var windowsOpen=[];function toggleInventory(){console.log("toggle inventory",JSON.stringify(windowsOpen)),console.log("mp.gui.chat.enabled",mp.gui.chat.enabled),console.log("mp.ui.ready",mp.ui.ready),-1==windowsOpen.indexOf("inventory")?0==mp.gui.chat.enabled&&1==mp.ui.ready&&(CEFInventory.call("setPos","inventory",Inventory_Order.positions.inventory.top,Inventory_Order.positions.inventory.left),CEFInventory.call("show"),CEFInventory.cursor(!0),windowsOpen.push("inventory"),mp.canCrouch=!1,mp.gui.chat.activate(!1)):mp.rpc.callBrowser(CEFInventory.browser,"isBusy").then(e=>{0==e?(CEFInventory.call("hide"),windowsOpen.splice(windowsOpen.indexOf("inventory"),1),0==windowsOpen.length&&(mp.gui.chat.activate(!0),CEFInventory.cursor(!1),mp.canCrouch=!0)):CEFNotification.call("notify",{title:"Inventory",titleSize:"16px",message:"Please finish your action before closing..",messageColor:"rgba(50,50,50,.8)",position:"bottomCenter",backgroundColor:"rgba(206, 206, 206, 0.9)",close:!1})}).catch(e=>{console.log("error",e),CEFInventory.call("hide"),windowsOpen.splice(windowsOpen.indexOf("inventory"),1),0==windowsOpen.length&&(mp.gui.chat.activate(!0),CEFInventory.cursor(!1),mp.canCrouch=!0)})}function toggleEquipment(){console.log("toggle inventory",JSON.stringify(windowsOpen)),console.log("mp.gui.chat.enabled",mp.gui.chat.enabled),console.log("mp.ui.ready",mp.ui.ready),-1==windowsOpen.indexOf("equipment")?0==mp.gui.chat.enabled&&1==mp.ui.ready&&(console.log("x"),CEFInventory.call("setPos","equipment",Inventory_Order.positions.equipment.top||0,Inventory_Order.positions.equipment.left||0),CEFInventory.call("show","equipment"),CEFInventory.cursor(!0),toggleInvState=!0,mp.canCrouch=!1,mp.gui.chat.activate(!1),windowsOpen.push("equipment")):mp.rpc.callBrowser(CEFInventory.browser,"isBusy").then(e=>{0==e?(CEFInventory.call("hide","equipment"),windowsOpen.splice(windowsOpen.indexOf("equipment"),1),0==windowsOpen.length&&(mp.gui.chat.activate(!0),CEFInventory.cursor(!1),mp.canCrouch=!0)):CEFNotification.call("notify",{title:"Inventory",titleSize:"16px",message:"Please finish your action before closing..",messageColor:"rgba(50,50,50,.8)",position:"bottomCenter",backgroundColor:"rgba(206, 206, 206, 0.9)",close:!1})}).catch(e=>{console.log("error",e),CEFInventory.call("hide"),windowsOpen.splice(windowsOpen.indexOf("equipment"),1),0==windowsOpen.length&&(mp.gui.chat.activate(!0),CEFInventory.cursor(!1),mp.canCrouch=!0)})}let toggleInvState=!1;mp.keys.bind(85,!1,()=>{toggleEquipment()}),mp.keys.bind(73,!1,()=>{toggleInventory()}),mp.events.add("Inventory:Update",e=>{TempStorage.inventory||(TempStorage.inventory=[]),CEFInventory.call("clear","inventory"),TempStorage.inventory=[],(e=e.sort(function(e,t){return t.height-e.height||t.width-e.width})).forEach(function(e){let t=StorageSystem.getTempSettings(e.id,"inventory"),n={id:e.id,name:e.name,image:e.image,scale:t.scale||{},amount:e.amount,max_stack:e.max_stack,mask:e.mask},i=e.width,o=e.height;1==t.flipped&&(e.width=o,e.height=i),TempStorage.inventory.push({id:n.id,name:n.name,image:n.image,scale:n.scale,amount:n.amount,max_stack:n.max_stack,width:i,height:o,cell:t.cell||0,row:t.row||0}),CEFInventory.call("addItem","inventory",t.cell||0,t.row||0,e.width,e.height,JSON.stringify(n),t.flipped||!1)})}),mp.events.add("Inventory:EditItem",e=>{console.log("Inventory:EditItem item",e)}),mp.events.add("Inventory:AddItem",e=>{TempStorage.inventory||(TempStorage.inventory=[]);let t=StorageSystem.getTempSettings(e.id,"inventory"),n={id:e.id,name:e.name,image:e.image,scale:t.scale||{},amount:e.amount,max_stack:e.max_stack,mask:e.mask},i=e.width,o=e.height;1==t.flipped&&(e.width=o,e.height=i),TempStorage.inventory.push({id:n.id,name:n.name,image:n.image,scale:n.scale,amount:n.amount,max_stack:n.max_stack,width:i,height:o,cell:t.cell||0,row:t.row||0,mask:e.mask}),CEFInventory.call("addItem","inventory",t.cell||0,t.row||0,e.width,e.height,JSON.stringify(n),t.flipped||!1)}),mp.events.add("Storage:Interact",e=>{console.log("Item use",e)}),mp.events.add("Storage:Drag",e=>{e=JSON.parse(e),Inventory_Order.positions[e.id]||(Inventory_Order.positions[e.id]={top:"40%",left:"25%"}),Inventory_Order.positions[e.id]={top:e.top+"px",left:e.left+"px"},mp.storage.data.inventory_order=Inventory_Order,mp.storage.flush()}),mp.events.add("Storage:Close",e=>{mp.events.callRemote("Storage:Close",e.replace("#",""))}),mp.events.add("Storage:Transfer",(e,t)=>{e=JSON.parse(e),t=JSON.parse(t),Inventory_Order={positions:Inventory_Order.positions,items:Inventory_Order.items},t.items.forEach(function(e){Inventory_Order.items[e.item.id+"_"+t.id]={cell:e.cell,row:e.row,scale:e.scale,flipped:e.flipped}}),e.items.forEach(function(t){Inventory_Order.items[t.item.id+"_"+e.id]={cell:t.cell,row:t.row,scale:t.scale,flipped:t.flipped}}),mp.storage.data.inventory_order=Inventory_Order,mp.storage.flush(),e.items=e.items.map(e=>StorageSystem.minify(e)),t.items=t.items.map(e=>StorageSystem.minify(e)),1==StorageSystem.needsUpdate(e,t)&&(TempStorage[e.id]=e.items,TempStorage[t.id]=t.items,mp.events.callRemote("Storage:Transfer",JSON.stringify(e),JSON.stringify(t)))}),mp.events.add("Storage:TransferSlots",(e,t)=>{e=JSON.parse(e),t=JSON.parse(t),Inventory_Order={positions:Inventory_Order.positions,items:Inventory_Order.items},e.items.forEach(function(t){Inventory_Order.items[t.item.id+"_"+e.id]={cell:t.cell,row:t.row,scale:t.scale,flipped:t.flipped}}),mp.storage.data.inventory_order=Inventory_Order,mp.storage.flush(),e.items=e.items.map(e=>StorageSystem.minify(e)),t.items=t.items.map(e=>Object.assign(StorageSystem.minify(e.item),{slot_id:e.id})),mp.events.callRemote("Storage:TransferSlots",JSON.stringify(e),JSON.stringify(t))}),mp.events.add("Storage:UpdateSlots",(e,t)=>{t.forEach(function(t,n){setTimeout(()=>{CEFInventory.call("addItemSlot",e,t)},1*n)})}),mp.events.add("Storage:AddContainer",(e,t,n,i,o)=>{console.log("add container"),o=JSON.parse(o),TempStorage[t]||(TempStorage[t]=[]);let r=o.map(function(e){let n=StorageSystem.getTempSettings(e.id,t),i=e.width,o=e.height;1==n.flipped&&(e.width=o,e.height=i);let r={id:e.id,name:e.name,image:e.image,scale:n.scale||{},amount:e.amount,max_stack:e.max_stack,mask:e.mask};return{width:e.width,height:e.height,cell:n.cell||0,row:n.row||0,item:r}});CEFInventory.call("show"),CEFInventory.call("setPos","inventory",Inventory_Order.positions.inventory.top,Inventory_Order.positions.inventory.left);let a=cell_size*n+2*padding,s=cell_size*i+37+2*padding,l={top:Inventory_Order.positions[t]?Inventory_Order.positions[t].top:`calc(50% - ${s/2}px)`,left:Inventory_Order.positions[t]?Inventory_Order.positions[t].left:`calc(50% - ${a/2}px)`};CEFInventory.call("addStorageContainer",e,t,l,n,i,r),TempStorage[t]=r.map(e=>e.item),CEFInventory.call("focus",t),CEFInventory.cursor(!0),toggleInvState=!0});var itemIdentity=require("../../server/world/items.js"),StorageSystem=new class{constructor(){this._openContainer=[]}closeOpenContainer(){}minify(e){return{id:e.item.id,name:e.item.name,amount:e.item.amount,max_stack:e.item.max_stack,data:e.item.data}}needsUpdate(e,t){let n=[],i=[];TempStorage[e.id]&&(n=TempStorage[e.id]),n=n.map(function(t){return Object.assign(t,{origin:e.id})}),TempStorage[t.id]&&(i=TempStorage[t.id]),i=i.map(function(e){return Object.assign(e,{origin:t.id})}),e.items=e.items.map(function(t){return Object.assign(t,{origin:e.id})}),t.items=t.items.map(function(e){return Object.assign(e,{origin:t.id})});let o=e.id==t.id?n:n.concat(i),r=e.id==t.id?e.items:e.items.concat(t.items);o=o.map(function(e){return{id:e.id,name:e.name,amount:e.amount,origin:e.origin}}),r=r.map(function(e){return{id:e.id,name:e.name,amount:e.amount,origin:e.origin}});var a=!1;let s=o.reduce(function(e,t){return e+parseInt(t.amount)},0),l=r.reduce(function(e,t){return e+parseInt(t.amount)},0);r.filter(e=>"NEW"==e.id).length>0&&(a=!0);let d=r.filter(e=>{return-1!=o.findIndex(function(t){return t.id==e.id&&(e.origin!=t.origin||e.amount!=t.amount)})&&"NEW"!=e.id});return o.filter(e=>{return-1==r.findIndex(function(t){return t.id==e.id})&&"NEW"!=e.id}).length>0&&(a=!0),d.forEach(n=>{console.log(n.id);let i=e.items.findIndex(e=>e.id==n.id),o=t.items.findIndex(e=>e.id==n.id);n.origin!=e.id?-1==i&&(a=!0):n.origin!=t.id&&-1==o&&(a=!0)}),console.log("Items Changed target ?",s,l),parseInt(s)!=parseInt(l)&&(a=!0),console.log("toUpdate",a),a}checkFit(e,t,n){return new Promise(function(i,o){mp.rpc.callBrowser(CEFInventory.browser,"doesFitInto",{what:e,w:t,h:n}).then(e=>(console.log("checkFit",e),i(e))).catch(e=>(console.log("error",e),o(e)))})}getTempSettings(e,t){return null!=Inventory_Order.items&&null!=Inventory_Order.items[e+"_"+t]&&{cell:Inventory_Order.items[e+"_"+t].cell,row:Inventory_Order.items[e+"_"+t].row,scale:Inventory_Order.items[e+"_"+t].scale,flipped:Inventory_Order.items[e+"_"+t].flipped}}};module.exports=StorageSystem;

},{"../../server/world/items.js":30,"./browser.js":1}],26:[function(require,module,exports){
mp.Vector3.prototype.findRot=function(t,o,r){let e=new mp.Vector3(this.x,this.y,this.z);var i=(t+r)*(Math.PI/180);return e.x=this.x+o*Math.cos(i),e.y=this.y+o*Math.sin(i),e},mp.Vector3.prototype.rotPoint=function(t){var o=new mp.Vector3(this.x,this.y,this.z),r=new mp.Vector3(t.x,t.y,t.z),e=r.z-o.z,i=o.x-r.x,s=o.y-r.y,n=Math.sqrt(i*i+s*s);return 180*Math.atan2(e,n)/Math.PI},mp.Vector3.prototype.lerp=function(t,o){let r=new mp.Vector3(this.x,this.y,this.z);return r.x=this.x+(t.x-this.x)*o,r.y=this.y+(t.y-this.y)*o,r.z=this.z+(t.z-this.z)*o,r},mp.Vector3.prototype.multiply=function(t){let o=new mp.Vector3(this.x,this.y,this.z);return o.x=this.x*t,o.y=this.y*t,o.z=this.z*t,o},mp.Vector3.prototype.dist=function(t){let o=this.x-t.x,r=this.y-t.y,e=this.z-t.z;return Math.sqrt(o*o+r*r+e*e)},mp.Vector3.prototype.dist2d=function(t){let o=this.x-t.x,r=this.y-t.y;return Math.sqrt(o*o+r*r)},mp.Vector3.prototype.getOffset=function(t){let o=this.x-t.x,r=this.y-t.y,e=this.z-t.z;return new mp.Vector3(o,r,e)},mp.Vector3.prototype.cross=function(t){let o=new mp.Vector3(0,0,0);return o.x=this.y*t.z-this.z*t.y,o.y=this.z*t.x-this.x*t.z,o.z=this.x*t.y-this.y*t.x,o},mp.Vector3.prototype.normalize=function(){let t=new mp.Vector3(0,0,0),o=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);return t.x=this.x/o,t.y=this.y/o,t.z=this.z/o,t},mp.Vector3.prototype.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z},mp.Vector3.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},mp.Vector3.prototype.angle=function(t){return Math.acos(this.normalize().dot(t.normalize()))},mp.Vector3.prototype.ground=function(){let t=new mp.Vector3(this.x,this.y,this.z),o=mp.game.gameplay.getGroundZFor3dCoord(t.x,t.y,t.z,0,!1),r=mp.game.gameplay.getGroundZFor3dCoord(t.x+.01,t.y+.01,t.z,0,!1),e=mp.game.gameplay.getGroundZFor3dCoord(t.x-.01,t.y-.01,t.z,0,!1);return t.z=o,(o+.1<r||o+.1<e)&&(t.z=r<e?e:r),t},mp.Vector3.prototype.ground2=function(t){let o=new mp.Vector3(this.x,this.y,this.z),r=mp.raycasting.testPointToPoint(o.add(0,0,1),o.sub(0,0,100),t.handle,17);return r&&r.position&&(o=mp.vector(r.position)),o},mp.Vector3.prototype.sub=function(t,o,r){return new mp.Vector3(this.x-t,this.y-o,this.z-r)},mp.Vector3.prototype.add=function(t,o,r){return new mp.Vector3(this.x+t,this.y+-o,this.z+r)},mp.vector=function(t){return new mp.Vector3(t.x,t.y,t.z)},mp.Vector3.prototype.insidePolygon=function(t){for(var o=this.x,r=this.y,e=!1,i=0,s=t.length-1;i<t.length;s=i++){var n=t[i][0],h=t[i][1],p=t[s][0],y=t[s][1];h>r!=y>r&&o<(p-n)*(r-h)/(y-h)+n&&(e=!e)}return e},Array.prototype.shuffle=function(){for(var t=this.length;t;){var o=Math.floor(Math.random()*t),r=this[--t];this[t]=this[o],this[o]=r}return this};

},{}],27:[function(require,module,exports){
const toSync=["health","running","engine","wheel_fl","wheel_fr","wheel_rl","wheel_rr","fuel","spark_plugs","battery"];function syncVehicle(e,l,t){"running"==e&&(console.log("Set Engine to",t),l.setEngineOn(t,!0,!0)),"health"==e&&(l.setPetrolTankHealth(t),l.setBodyHealth(t)),"engine"==e&&l.setEngineHealth(1==t||1==t?1e3:0);let n=0;"wheel_fl"==e&&(0==t?(l.setTyreBurst(0,!0,1e3),n+=1):l.setTyreFixed(0)),"wheel_fr"==e&&(0==t?(l.setTyreBurst(1,!0,1e3),n+=1):l.setTyreFixed(1)),"wheel_rl"==e&&(0==t?(l.setTyreBurst(4,!0,1e3),n+=1):l.setTyreFixed(4)),"wheel_rr"==e&&(0==t?(l.setTyreBurst(5,!0,1e3),n+=1):l.setTyreFixed(5)),n>=3?l.setReduceGrip(!0):l.setReduceGrip(!1)}toSync.forEach(function(e){mp.events.addDataHandler(e,(l,t)=>{"vehicle"===l.type&&(syncVehicle(e,l,t),console.log(`${e} changed to ${t} on entity ${l.handle}.`))})}),mp.events.add("entityStreamIn",e=>{if("vehicle"===e.type){let l=e.getVariable("components");null!=l&&Object.keys(l).forEach(function(t,n){syncVehicle(t,e,l[t])})}});var drivenDist=0,drivenOldPos=null;mp.events.add("playerEnterVehicle",(e,l)=>{if(null!=e){let l=e.getVariable("running");null!=l&&(e.freezePosition(!1),drivenDist=0,1==l?e.setEngineOn(!0,!0,!0):e.setEngineOn(!1,!0,!0))}}),mp.events.add("render",()=>{mp.localPlayer.position;if(mp.localPlayer.vehicle&&mp.localPlayer.isInAnyVehicle(!1)){let e=mp.localPlayer.vehicle;if(e.getPedInSeat(-1)==mp.localPlayer.handle){if(null!=drivenOldPos){let e=mp.localPlayer.vehicle.position,l=mp.game.system.vdist(drivenOldPos.x,drivenOldPos.y,drivenOldPos.z,e.x,e.y,e.z);l<7500&&l>0&&(drivenDist+=l)>100&&(mp.events.callRemote("Vehicles:UpdateFuel",drivenDist),drivenDist=0)}if(drivenOldPos=mp.localPlayer.vehicle.position,e.getVariable("running")){mp.game.graphics.drawText("Engine:"+(e.getVariable("running")?"~g~On":"~r~Off"),[.4,.8],{font:4,color:[255,255,255,185],scale:[.4,.4],outline:!0,centre:!0});let l=Math.ceil(e.getSpeed()*(e.getSpeed()/20)*2);mp.game.graphics.drawText(l+" KM/H",[.6,.8],{font:4,color:[255,255,255,185],scale:[.4,.4],outline:!0,centre:!0}),e.getVariable("components").fuel&&mp.game.graphics.drawText("Fuel:"+(e.getVariable("components").fuel>0?e.getVariable("components").fuel.toFixed(2):"0")+"L",[.5,.8],{font:4,color:[255,255,255,185],scale:[.4,.4],outline:!0,centre:!0})}}}mp.players.local.isInAnyVehicle(!1)&&null!=mp.players.local.vehicle&&1!=mp.players.local.vehicle.getVariable("running")&&(mp.game.controls.disableControlAction(0,278,!0),mp.game.controls.disableControlAction(0,279,!0),mp.game.controls.disableControlAction(0,280,!0),mp.game.controls.disableControlAction(0,281,!0),mp.game.controls.disableControlAction(2,278,!0),mp.game.controls.disableControlAction(2,279,!0),mp.game.controls.disableControlAction(2,280,!0),mp.game.controls.disableControlAction(2,281,!0),mp.players.local.vehicle.setEngineOn(!1,!0,!0))}),mp.keys.bind(88,!0,function(){mp.events.callRemote("Vehicles:ToggleEngine"),mp.events.callRemote("Vehicles:RequestInventory")});var seats={0:"seat_pside_f",1:"seat_dside_r",2:"seat_pside_r",3:"seat_dside_r1",4:"seat_pside_r1",5:"seat_dside_r2",6:"seat_pside_r2",7:"seat_dside_r3",8:"seat_pside_r3",9:"seat_dside_r4",10:"seat_pside_r4",11:"seat_dside_r5",12:"seat_pside_r5",13:"seat_dside_r6",14:"seat_pside_r6",15:"seat_dside_r7",16:"seat_pside_r7"};mp.game.controls.useDefaultVehicleEntering=!1,mp.keys.bind(71,!1,()=>{if(console.log("G"),null===mp.players.local.vehicle){if(mp.gui.cursor.visible)return;let l=mp.players.local.position,t={veh:null,dist:900};mp.vehicles.forEachInStreamRange(e=>{let n=e.position,s=mp.game.system.vdist2(l.x,l.y,l.z,n.x,n.y,n.z);s<t.dist&&(t.dist=s,t.veh=e)});let n=t.veh;if(null!==n&&n.isAnySeatEmpty()){let t={seat:0,dist:99999,pos:new mp.Vector3(0,0,0)},s=!1,i=mp.game.vehicle.getVehicleSeats(n);for(var e=0;e<=i;e++)if(n.isSeatFree(e)){e<=2&&(s=!0);let i=seats[e],a=n.getWorldPositionOfBone(n.getBoneIndexByName(i)),o=(mp.game.gameplay.getGroundZFor3dCoord(a.x,a.y,a.z,0,!1),mp.game.system.vdist2(l.x,l.y,l.z,a.x,a.y,a.z));e>2&&1==s||(1917016601==n.model&&e>0&&t.dist>30&&(t.dist=30,t.seat=e),o<t.dist&&(t.dist=o,t.seat=e))}1475773103==n.model&&t.seat>0?mp.players.local.taskEnterVehicle(n.handle,5e3,t.seat,2,16,0):mp.players.local.taskEnterVehicle(n.handle,5e3,t.seat,2,1,0)}}});

},{}],28:[function(require,module,exports){
require("./vector.js"),mp.game.audio.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE"),mp.game.audio.startAudioScene("MIC1_RADIO_DISABLE");var Weather=new class{constructor(){let e=this;e._areas=[],e._inside=void 0,mp.events.add("Weather:LoadAreas",a=>{e.loadWeather(JSON.parse(a))}),setInterval(function(){e._check()},1e3)}loadWeather(e){let a=this;a._areas=e,a._areas.forEach(function(e,t){e.polygon.forEach(function(e,i){a._areas[t].polygon[i]=[e.x,e.y]})})}enter(e){this._inside=e;let a=this._areas[e];mp.game.gameplay.setWind(a.wind.speed),mp.game.gameplay.setWindDirection(a.wind.dir),mp.game.gameplay.setWeatherTypeOverTime(a.name,1),mp.game.gameplay.setRainFxIntensity(a.rain),mp.events.callRemote("Weather:TransitionTo",this._inside)}exit(){this._inside=void 0,mp.events.callRemote("Weather:Exit"),mp.game.gameplay.setWeatherTypeOverTime("CLEAR",1),mp.game.gameplay.setWind(0),mp.game.gameplay.setWindDirection(0),mp.game.gameplay.setRainFxIntensity(0)}_check(){let e=this;if(e._areas.length>0){let a=mp.vector(mp.players.local.position),t=e._areas.findIndex(function(e,t){return 1==a.insidePolygon(e.polygon)});e._inside!=t&&(t>-1?e.enter(t):e.exit())}}};module.exports=Weather;

},{"./vector.js":26}],29:[function(require,module,exports){
var Zombie=class{constructor(){this._setup()}_setup(){this._pos={x:mp.players.local.position.x,y:mp.players.local.position.y,z:mp.players.local.position.z},this.movementTimer,this.syncTimer,this._ped=mp.peds.new(mp.game.joaat("ig_abigail"),new mp.Vector3(this._pos.x,this._pos.y,this._pos.z),Math.random(0,360),function(e){},0),this.init(),this.blip=mp.blips.new(9,new mp.Vector3(this._pos.x,this._pos.y,this._pos.z),{color:3,scale:.2,alpha:100,drawDistance:0}),this._task={},this._target=mp.players.local}get ped(){return this._ped}get pos(){return this._ped.getCoords(!0)}init(){var e=this;let t="move_heist_lester";if(e.loadPedAttributes(),!mp.game.streaming.hasClipSetLoaded(t))for(mp.game.streaming.requestClipSet(t);!mp.game.streaming.hasClipSetLoaded(t);)mp.game.wait(0);e._ped.setMovementClipset(t,0),e.syncTimer=setInterval(function(){e.move()},5e3)}loadPedAttributes(){this._ped.freezePosition(!1),this._ped.setCanRagdoll(!0),this._ped.setRagdollOnCollision(!0),this._ped.setCanRagdollFromPlayerImpact(!0),this._ped.setCombatAbility(100),this._ped.setCombatMovement(3);for(var e=1;e<64;e+=2)this._ped.setFleeAttributes(e,!1);this._ped.setFleeAttributes(0,!1),this._ped.setCombatAttributes(17,!0),this._ped.setCombatAttributes(16,!0),this._ped.setInvincible(!1),this._ped.setCanBeDamaged(!0),this._ped.setOnlyDamagedByPlayer(!1),this._ped.setBlockingOfNonTemporaryEvents(!0)}move(){let e=this._target.position;this._ped.resetRagdollTimer(),this.blip.setCoords(this._ped.getCoords(!0)),this._ped.clearTasksImmediately(),this._ped.taskGoToCoordAnyMeans(e.x,e.y,e.z,5,0,!1,786603,0),this._ped.taskPutDirectlyIntoMelee(this._target.handle,0,-1,1,!1)}},Zombies=[];

},{}],30:[function(require,module,exports){
function getRandomInt(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}var items={Hatchet:{width:2,height:4,max_stack:1,name:"Hatchet",image:"../../source/img/equipment/hatchet.png",type:"Residential",model:"prop_w_me_hatchet",thickness:.15,amount:1,mask:"melee",offset:{pos:new mp.Vector3(0,0,.02),rot:new mp.Vector3(90,0,0)},modifiers:{spread:function(){return getRandomInt(1,3)},durability:function(){return 100}}},Pickaxe:{width:3,height:3,max_stack:1,name:"Pickaxe",image:"../../source/img/equipment/pickaxe.png",type:"Residential",model:"prop_tool_pickaxe",thickness:.15,amount:1,mask:"melee",offset:{pos:new mp.Vector3(0,0,.02),rot:new mp.Vector3(0,0,0)},modifiers:{reward:function(){return getRandomInt(1,3)},durability:function(){return 100}}},"Pump Shotgun":{width:4,height:2,max_stack:1,name:"Pump Shotgun",image:"../../source/img/equipment/weapon_pumpshotgun.png",type:"Residential",model:"w_sg_pumpshotgun",thickness:.15,amount:1,mask:"Primary",offset:{pos:new mp.Vector3(0,0,.02),rot:new mp.Vector3(90,0,0)}},"12 Gauge Shells":{width:1,height:1,max_stack:32,name:"12 Gauge Shells",image:"../../source/img/ammo/12_Gauge_Shells.png",type:"Residential",model:"w_sg_assaultshotgun_mag1",mask:"Ammo",thickness:.15,amount:function(){return getRandomInt(1,Math.floor(this.max_stack/4))},offset:{pos:new mp.Vector3(0,0,.02),rot:new mp.Vector3(90,0,0)}},"Micro SMG":{width:3,height:2,max_stack:1,name:"Micro SMG",image:"../../source/img/equipment/weapon_microsmg.png",type:"Industrial",model:"w_sb_microsmg",thickness:.15,amount:1,mask:"Primary|Secondary",offset:{pos:new mp.Vector3(0,0,.02),rot:new mp.Vector3(90,0,0)}},"9mm Bullets":{width:1,height:1,max_stack:128,name:"9mm Bullets",image:"../../source/img/ammo/9mm_bullets.png",type:"Industrial",model:"w_sb_microsmg_mag1",thickness:.15,mask:"Ammo",amount:function(){return getRandomInt(1,Math.floor(this.max_stack/4))},offset:{pos:new mp.Vector3(0,0,.01),rot:new mp.Vector3(90,0,0)}},"Assault Rifle":{width:4,height:2,max_stack:1,name:"Assault Rifle",image:"../../source/img/equipment/weapon_assaultrifle.png",type:"Military",model:"w_ar_assaultrifle",thickness:.15,amount:1,mask:"Primary",offset:{pos:new mp.Vector3(0,0,.02),rot:new mp.Vector3(90,0,0)},mask:"Primary"},"5.56m Bullets":{width:1,height:1,max_stack:64,name:"5.56m Bullets",image:"../../source/img/ammo/556m_Bullets.png",type:"Military",model:"w_ar_assaultrifle_mag1",thickness:.15,mask:"Ammo",amount:function(){return getRandomInt(1,Math.floor(this.max_stack/4))},offset:{pos:new mp.Vector3(0,0,.01),rot:new mp.Vector3(90,0,0)}},"Sprunk Can":{width:1,height:2,max_stack:14,name:"Sprunk Can",image:"../../source/img/consumable/energy_drink_small.png",type:"Food",model:"ng_proc_sodacan_01a",thickness:.25,mask:"Food",amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Beer:{width:1,height:2,max_stack:15,name:"Beer",image:"https://via.placeholder.com/40x80?text="+this.name,type:"Food",mask:"Food",model:"prop_cs_beer_bot_03",thickness:.15,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},"Drank Bottle":{width:1,height:2,max_stack:14,name:"Drank Fresh",image:"https://via.placeholder.com/40x80?text="+this.name,type:"Food",model:"ng_proc_ojbot_01a",mask:"Food",thickness:.2,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Banana:{width:2,height:1,max_stack:24,name:"Banana",image:"https://via.placeholder.com/80x40?text="+this.name,type:"Food",model:"ng_proc_food_nana1a",mask:"Food",thickness:.15,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Orange:{width:1,height:1,max_stack:24,name:"Orange",image:"https://via.placeholder.com/40x40?text="+this.name,type:"Food",model:"ng_proc_food_ornge1a",mask:"Food",thickness:.15,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},"Crackles O`Dawn":{width:1,height:2,max_stack:24,name:"Crackles O`Dawn",image:"https://via.placeholder.com/40x80?text="+this.name,type:"Food",model:"v_res_tt_cereal02",mask:"Food",thickness:.2,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},"Strawberry Rails":{width:1,height:2,max_stack:24,name:"Strawberry Rails",image:"https://via.placeholder.com/40x80",type:"Food",model:"v_res_fa_cereal01",mask:"Food",thickness:.2,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},"Chicken Noodles":{width:1,height:2,max_stack:24,name:"Chicken Noodles",image:"https://via.placeholder.com/40x80?text="+this.name,type:"Food",mask:"Food",model:"v_res_fa_potnoodle",thickness:.15,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Bread:{width:1,height:2,max_stack:24,name:"Bread",image:"https://via.placeholder.com/40x80?text="+this.name,type:"Food",mask:"Food",model:"v_res_fa_bread01",thickness:.25,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,.03),rot:new mp.Vector3(90,0,0)}},"Gas Can":{width:3,height:3,max_stack:1,name:"Gas Can",image:"../../source/img/tools/jerrycan.png",type:"Industrial",model:"prop_oilcan_01a",thickness:.25,mask:"Tool",amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Wood:{width:2,height:2,max_stack:128,name:"Wood",image:"../../source/img/resource/wood.png",type:"Craftable",model:"prop_fncwood_13c",mask:"Material",thickness:.35,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,90)}},Stone:{width:2,height:2,max_stack:128,name:"Stone",image:"../../source/img/resource/stone.png",type:"Craftable",model:"proc_sml_stones01",mask:"Material",thickness:.35,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Leaf:{width:2,height:1,max_stack:128,name:"Leaf",image:"https://via.placeholder.com/80x40?text=Leaf",type:"Craftable",model:"ng_proc_leaves05",mask:"Material",thickness:.35,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Tire:{width:4,height:4,max_stack:1,name:"Tire",image:"https://via.placeholder.com/160x160?text="+this.name,type:"Industrial",model:"ng_proc_tyre_01",mask:"Wheels",thickness:.35,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Morphine:{width:2,height:1,max_stack:4,name:"Wood",image:"https://via.placeholder.com/40x80?text="+this.name,type:"Hospital",model:"ng_proc_syrnige01a",mask:"Heal",thickness:.15,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}},Furnace:{width:2,height:2,max_stack:1,name:"Furnace",image:"https://via.placeholder.com/40x80?text="+this.name,type:"Craftable",model:"prop_paper_bag_01",mask:"Building",thickness:.15,amount:function(){return 1},offset:{pos:new mp.Vector3(0,0,0),rot:new mp.Vector3(0,0,0)}}};module.exports=items;

},{}]},{},[8]);
