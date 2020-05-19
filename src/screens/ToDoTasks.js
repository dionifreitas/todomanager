import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {readTasksFromFirebaseAsync} from '../services/FirebaseApi';
import {TaskListView} from '../components/Components';
const imgPlus = require('../assets/add.png');

export default class ToDoTasks extends Component {
  state = {
    tasks: [],
  };

  _goToTask() {
    this.props.navigation.navigate('Task');
  }

  _fetchTasks(tasks) {
    const tasksToDo = tasks.filter(t => !t.isDone);

    this.setState({tasks: tasksToDo});
  }

  componentDidMount() {
    readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <TaskListView
          tasks={this.state.tasks}
          navigation={this.props.navigation}
        />
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => this._goToTask()}>
          <Image source={imgPlus} style={styles.img} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  img: {
    width: 70,
    height: 70,
  },
  floatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
