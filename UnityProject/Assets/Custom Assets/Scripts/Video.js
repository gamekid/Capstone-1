
// these get set in Start()
private var mainTex : MovieTexture;
private var maskTex : MovieTexture;
private var parentScript : Avatar;

// these get set in the inspector
public var testTex : MovieTexture;
public var testTexAlpha : MovieTexture;
public var punchTex : MovieTexture;
public var punchMask : MovieTexture;

function Start() {
	parentScript = transform.parent.GetComponent( Avatar );
	mainTex = renderer.material.mainTexture;
	maskTex = renderer.material.GetTexture( '_Mask' );
	
	ForceTexture( mainTex, maskTex );
}

function Update() {
	switch( true ) {
		case parentScript.IsJumping():
			SetTexture( testTex, testTexAlpha );
			transform.localScale.x = 1.8;
			break;
		case parentScript.attackType == 'punch':
			SetTexture( punchTex, punchMask );
			transform.localScale.x = 2;
			break;
		default:
			SetTexture( mainTex, maskTex );
			transform.localScale.x = 1.8;
			break;
	}
}

function IsButtonDown( button ) {
	return Input.GetButtonDown( button + ' ' + parentScript.GetPlayerLetter() );
}

function SetTexture( base : MovieTexture, alpha : MovieTexture ) {
	if (IsCurTex( base )) return; // abort if already current texture
	ForceTexture( base, alpha );
}
function ForceTexture( base : MovieTexture, alpha : MovieTexture ) {	
	renderer.material.mainTexture = base;
	renderer.material.SetTexture( '_Mask', alpha );
	base.loop = alpha.loop = true;
	base.Stop();
	base.Play();
	alpha.Stop();
	alpha.Play();
}

function IsCurTex( tex : MovieTexture ) {
	return (renderer.material.mainTexture.name == tex.name);
}