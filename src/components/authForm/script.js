/**
*   @version 1.0 beta
*   @module @/components/authForm
*   @desc <stronpagent Logout</strong>
*   @see ~/components/authForm
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import authServices from '@/services/authServices'

const data = () => {
    return {
        logo: require('@/assets/images/logo/logo.png'),
        text: {
            nextBtn: 'Продолжить',
            footer: 'Datings Rating 2019',
            loginLabel: 'Логин',
            passLabel: 'Пароль',
            inputRequired: 'Поле обязательно к заполнению'
        },
        login: null,
        pass: null,
        dictionary: {
            attributes: {
                email: 'E-mail Address'
                // custom attributes
            },
            custom: {
                name: {
                    required: () => 'Логин не может быть пустым'
                },
                password: {
                    required: () => 'Пароль не может быть пустым'
                }
            }
        },
        snackbar: false,
        message: ''
    }
}

const methods = {
    // Отправка данных на сервер
    async submit (isValidate = false) {
        this.message = ''
        this.snackbar = false
        
        if (isValidate) {
            if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_METHODS) this.$log.debug('component \'Auth Form\' (@/components/authForm) -> method init')
                let data = {
                    "login": this.login,
                    "passwd": this.pass
                };

                const req = await authServices.submitAuthForm(data)
                if (req.status == 200 && req.data.status == 'OK') {
                    if (this.$store.state.Site.params.log.LOG_METHODS) this.$log.debug('component \'Auth Form\' (@/components/authForm) -> POST req SUCCESS')
                    let result = req.data
                    this.$store.dispatch('Auth/setUser', result, { root: true })
                } else {
                    if (req.data.status === 'ERROR') this.message = 'Неправильное имя пользователя или пароль'
                    else this.message = 'Ошибка авторизации'
                    this.$log.error('component \'Auth Form\' (@/components/authForm) -> post req error')
                    this.snackbar = true
                }
        }
    },
    // Валидация формы
    beforeSubmit () {
        if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_METHODS) this.$log.debug('component \'Auth Form\' (@/components/authForm) -> method init')
        this.$validator.validateAll().then((result) => {
            if (result) {
                if (this.$store.state.Site.params.log.LOG_METHODS) this.$log.debug('component \'Auth Form\' (@/components/authForm) -> Form validate - Success')
                return this.submit(true);
            }
        });
    },
}

export default {
    name: 'authForm',

    $_veeValidate: {
      validator: 'new'
    },

    data: data,
    computed: {
    },
    /**
    * @desc ▶ Hook reporting <br>
    * <strong style="color:red; font-size: 18px;">ⓘ</strong>
    * @event module:@/components/authForm~COMPONpageng>Logout</strong> mounted
    */
    mounted: function(){
        if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.VUE_APP_LOG_MOUNTED) this.$log.info('component \'@/components/authForm\' -> mounted');
        this.$validator.localize('en', this.dictionary)
    },
    methods: methods
}