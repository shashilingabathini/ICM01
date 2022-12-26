package com.ibm.icm.j8;

import java.util.*;
import java.util.function.Predicate;

public class Predicates {

    public List<Apple> filterApples(List<Apple> apples , Predicate<Apple> predicate) { // this predicate will hava a method (@functional interface)
        List<Apple> appleList = new ArrayList<>();
        for(Apple apple : apples) {
            if(predicate.test(apple))
                appleList.add(apple);
        }
        return appleList;
    }

    private static boolean isGreenAndWeight(Apple apple) {
        return  "green".equals(apple.getColor()) && apple.getWeight() > 10;
    }

    // there are two predicates for me 1 . with weight 2. with color
    private static boolean isGreenColor(Apple apple) {
        return  "green".equals(apple.getColor());
    }

    private static boolean isHeavy(Apple apple) {
        return apple.getWeight() > 10;
    }

   static  class Apple {

        private  String color;
        private int weight;

        public Apple(String color , int weight) {
            this.color =  color;
            this.weight  =  weight;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public int getWeight() {
            return weight;
        }

        public void setWeight(int weight) {
            this.weight = weight;
        }
    }


    public static void main(String args[]) {
        Predicates predicates = new Predicates();
        Apple a1 = new Apple("green",20);
        Apple a2 = new Apple("yellow",20);
        Apple a3 = new Apple("green",20);
        Apple a4 = new Apple("green",111);
        List<Apple> allApples = new ArrayList<>();
        allApples.add(a1);allApples.add(a2);allApples.add(a3);allApples.add(a4);
        List<Apple> greens =  predicates.filterApples(allApples,Predicates::isGreenColor);
        System.out.println("Non short call :"+greens.size());
        // short call for the same
        greens  =  predicates.filterApples(allApples,(Apple apple) -> "green".equals(apple.getColor())); // this is anonymous lambda expression
        System.out.println("Short call :"+greens.size());
        List<Apple> allWeights = predicates.filterApples(allApples,Predicates::isHeavy);
        System.out.println("Heavy is Non short "+allWeights.size());
        allWeights = predicates.filterApples(allApples,(Apple apple) -> apple.getWeight() > 10 ); // this is anonymous lambda expression
        System.out.println("Heavy is  Short"+allWeights.size());
    }
}
