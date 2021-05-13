﻿using LMPlatform.Models;
using LMPlatform.UI.Services.Modules.CoreModels;
using System.Collections.Generic;
using System.Linq;

namespace LMPlatform.UI.ViewModels.SubjectViewModels
{
    public class SubjectViewModel
    {
        public SubjectViewModel()
        {
        }

        public SubjectViewModel(Subject model)
        {
            var subjectGroups = model.SubjectGroups.Where(x => x.IsActiveOnCurrentGroup);
            SubjectId = model.Id;
            DisplayName = model.Name;
            Name = model.ShortName;
            GroupsCount = subjectGroups.Count();
            StudentsCount = subjectGroups.Sum(x => x.SubjectStudents.Count);
            Groups = subjectGroups.Select(x => new GroupsViewData()
            {
                GroupId = x.GroupId,
                GroupName = x.Group.Name,
            });
        }

        public int SubjectId
        {
            get; 
            set;
        }

        public string DisplayName
        {
            get;
            set;
        }

        public string Name
        {
            get; 
            set;
        }

        public int GroupsCount { get; set; }

        public int StudentsCount { get; set; }

        public IEnumerable<GroupsViewData> Groups { get; set; }

    }
}