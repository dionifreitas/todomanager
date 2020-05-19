import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {readTasksFromFirebaseAsync} from '../services/FirebaseApi';
import {TaskListView} from '../components/Components';
export default class DoneTasks extends Component {
  componentDidMount() {
    readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
  }
  state = {
    tasks: [],
  };
  _fetchTasks(tasks) {
    const tasksToDo = tasks.filter(t => t.isDone);
    this.setState({tasks: tasksToDo});
  }
  render() {
    return (
      <View style={styles.conteiner}>
        <TaskListView
          tasks={this.state.tasks}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  img: {
    width: 50,
    height: 50,
  },
});
