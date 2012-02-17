public var attackType: String;

private var attackPos : Vector3;
private var lifeTime : float;
private var parentScript : Avatar;

function Awake () {
	gameObject.active  = false; //deactivate at start
	attackType = "";
	parentScript = transform.parent.GetComponent( Avatar );
}

function Update(){
	if (lifeTime <= 0 && parentScript.attackType != ""){ //if attack was just activated and the last attack has finished
		gameObject.active = true;
		switch (parentScript.attackType){
			case 'punch':
				lifeTime = .4;
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


function OnCollisionEnter(collision : Collision) {
    // Debug-draw all contact points and normals
    for (var contact : ContactPoint in collision.contacts) {
        Debug.DrawRay(contact.point, contact.normal, Color.white);
    }
    print("COLLISION");
    
}