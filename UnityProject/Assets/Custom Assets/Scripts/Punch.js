public var parentObj : GameObject;
@System.NonSerialized
public var activeTest : boolean = false;

private var punchPos : Vector3;
private var playerLetter;
private var lifeTime : float;

function Awake () {
	lifeTime = .5;
	playerLetter = this.name.Substring( (this.name.Length - 3), 3 ); // grab last 3 characters of name string
}

function Update(){
	gameObject.active = activeTest;
		
	print(activeTest);
	lifeTime = lifeTime - Time.deltaTime;
	transform.position.x = parentObj.transform.position.x;
}