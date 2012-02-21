public var attackType: String;
public var enemyScript : Avatar;

private var attackPos : Vector3;
private var lifeTime : float;
private var parentScript : Avatar;


function Awake () {
	gameObject.active  = false; //deactivate at start
	attackType = "";
	parentScript = transform.parent.GetComponent( Avatar );
	enemyScripy = GameObject.Find("Avatar");
}

function Update(){
	if (lifeTime <= 0 && parentScript.attackType != ""){ //if attack was just activated and the last attack has finished
		gameObject.active = true;
		switch (parentScript.attackType){
			case 'punch':
				lifeTime = .2;
				transform.localScale.y = .25;
				transform.localPosition.x = -.4;
				transform.localPosition.y = .55;
				break;
			default: lifeTime = 0;
		}
	}else if (gameObject.active  && lifeTime > 0){ // else if attacking
		lifeTime = lifeTime - Time.deltaTime; //decrement the lifeTime
		if (lifeTime <= 0){ //if the time to live has run out
			gameObject.active  = false; //deactivate
			parentScript.attackType = "";
		}
	}
}
var dir : float = 0;
@System.NonSerialized 
var pushPower : float = 500;
function OnCollisionEnter(collision : Collision) {
	// Check if the collider we hit has a rigidbody
  	// Then apply the force
    for (var contact : ContactPoint in collision.contacts) {
		if (contact.otherCollider.name != transform.parent.name){//if the enemy has been hit
			if (parentScript.facing == 'right')
				dir = 1;
			else
				dir = -1;
			enemyScript.horizontalSpeed = pushPower * dir * Time.deltaTime;
			enemyScript.health -= 20;
			lifeTime = 0;
			return;
		}
	}
}









