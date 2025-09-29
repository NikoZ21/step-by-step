import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';

import { customAlphabet } from 'nanoid/non-secure';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10);

import { Task } from '../../models/task';

import IconSelector from './IconSelector';
import CustomInput from './CustomInput';
import Steps from './Steps/index';

import { useTasks } from '../../context/TasksContext';

interface props {
  visible: boolean;
  onClose: () => void;
  initialValues: Task;
}

const initialTask: Task = {
  id: '',
  title: '',
  description: '',
  icon: 'Zap',
  steps: [
    {
      id: 1,
      description: '',
      completed: false,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function TaskFormModal({ visible, onClose, initialValues }: props) {
  console.log('TaskFormModal  with the values: ', JSON.stringify(initialValues));

  const tasksContext = useTasks();

  const [newTask, setNewTask] = useState<Task>(initialTask);

  const updateNewTask = (updates: Partial<Task>) => {
    setNewTask({ ...newTask, ...updates });
  };

  const header = initialValues.id !== '' ? 'Edit Task' : 'New Task';
  const buttonText = initialValues.id !== '' ? 'Save Changes' : 'Create Task';

  useEffect(() => {
    setNewTask(initialValues);
  }, [initialValues]);

  const handleCreateTask = () => {
    if (newTask.id !== '') {
      tasksContext.updateTask(newTask);
    } else {
      const taskWithId = {
        ...newTask,
        id: nanoid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      tasksContext.addTask(taskWithId);
    }

    onClose();
    setNewTask(initialTask);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{header}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                onClose();
                setNewTask(initialTask);
              }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.newTaskContainer} showsVerticalScrollIndicator={false}>
            {/* Task Title Input */}
            <CustomInput
              label="Task Name"
              value={newTask.title}
              placeholder="Enter task name..."
              onChangeText={text => updateNewTask({ title: text })}
            />
            {/* Task Description Input */}
            <CustomInput
              label="Description"
              value={newTask.description}
              placeholder="Enter description..."
              onChangeText={text => updateNewTask({ description: text })}
              multiline={true}
              numberOfLines={1}
            />
            {/* Icon Selection */}
            <IconSelector newTask={newTask} updateNewTask={updateNewTask} />

            {/* Steps */}
            <Steps newTask={newTask} updateNewTask={updateNewTask} />

            {/* Create Button */}
            <TouchableOpacity style={styles.createTaskButton} onPress={handleCreateTask}>
              <Text style={styles.createTaskButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#262629',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '60%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#4A4A4E',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#4A4A4E',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  newTaskContainer: {
    marginTop: 24,
    flex: 1,
    paddingHorizontal: 24,
  },

  createTaskButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  createTaskButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
  },
});
