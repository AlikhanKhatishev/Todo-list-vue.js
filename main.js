const vm = {
    data() {
        return {
            title: 'Список заметок!',
            myPlaceholder: 'Ввод',
            inputValue: '',
            todoList: [
                { title: 'Первая', date: new Date().toLocaleString() },
                { title: 'Вторая', date: new Date().toLocaleString() },
                { title: 'Третья', date: new Date().toLocaleString() }
            ]
        }
    },
    mounted() {
        let data = localStorage.getItem('todoList')
        data ? this.todoList = JSON.parse(data) : []
    },
    methods: {
        addTitle() {
            if (this.inputValue !== '') {
                this.todoList.push({
                    title: this.inputValue,
                    date: new Date().toLocaleString()
                })
                localStorage.setItem('todoList', JSON.stringify(this.todoList))
            }
            this.inputValue = ''
        },
        removeTitle(index) {
            this.todoList.splice(index, 1)
            localStorage.setItem('todoList', JSON.stringify(this.todoList))
        },
        reverseTodoList() {
            this.todoList.reverse()
        },
        sortedTodoList() {
            return this.todoList.sort((a, b) => (a.title > b.title) ? 1 : -1)
        },
        sortedDateTodoList() {
            return this.todoList.sort(function (a, b) {
                return new Date(a.date) > new Date(b.date) ? 1 : -1;
            })
        }, editNote(item) {
            item.edited = !item.edited
        }
    },
    computed: {
        filteredTodoList() {
            let result = this.inputValue;
            return this.todoList.filter(function (elem) {
                if (result == '') { return true; }
                else return elem.title.toUpperCase().indexOf(result.toUpperCase()) > -1
            })
        }
    }
}

Vue.createApp(vm).mount('#app')