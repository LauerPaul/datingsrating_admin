/**
*   @version 1.0 beta
*   @module @/components/site-edit-primary
*   @desc <strong>Component Site Edit Primary</strong>
*   @see ~/components/site-edit-primary
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
const data = () => {
	return {
		form: null,
		preview: false,
		imageNew: '',
		imageFile: null,
		active: false,
		url_translite: ''
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit-primary\' -> method init');
		this.form = this.item
		this.active = parseInt(this.form.active) ? true : false
	},

	imageNewSet (event) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit-primary\' -> method init');
		this.imageFile = event.target.files[0]
		this.imageNew = URL.createObjectURL(this.imageFile);
	},

	submitForm () {
		let logo = null

		if (this.imageNew) {
			logo = this.imageFile
			logo.key = "logo"
		}

		this.$emit('sendData', 'primary', this.form, logo)
	},

	transliteration (text=false) {
		if (text === false) return false
		var arrru = new Array ('Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э', ' ');
		var arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E', 'e', '_');

		for(var i=0; i<arrru.length; i++){
			var reg = new RegExp(arrru[i], "g");
			text = text.replace(reg, arren[i]);
			text = text.replace('.', '_');
			text = text.replace(',', '_');
			text = text.replace('__', '_');
			text = text.replace(/[&\/\\#,+()$~%.'":*?<>{}|@№!;=]/g, '');
			text = text.toLowerCase();
	    }
		if(text) this.url_translite = text
	}
}

export default {
	name: 'siteEditPrimary',
	data: data,
	computed: {
		imageVal () {
			if(this.imageNew) return this.imageNew
			else return this.$root.domain + (this.item.logo ? this.item.logo : '/uploads/noimage.png')
		},
	},
	props: ['item'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/site-edit-primary~COMPONENT <strong>Site Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/site-edit-primary\' -> mounted');		
		this.setData()
	},
	created () {
		this.$root.$on('siteEditSend', this.submitForm);
		this.$emit('componentReady', 'primary')
	},
	methods: methods,
	watch: {
		item () {
			this.setData()
		},

		active () {
			this.form.active = this.active ? 1 : 0
		},

		url_translite () {
			this.$emit('urlTranslite', this.url_translite)
		}
	}
}