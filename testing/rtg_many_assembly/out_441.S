.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x10 , 1
		lui      x22 , 2
		lui      x9 , 6
		lui      x30 , 0
		lui      x11 , 2
		lui      x13 , 0
		lui      x6 , 6
		lui      x24 , 7
		sw       x21 , 104 (x10) 
		sw       x12 , 108 (x22) 
		sw       x29 , 112 (x9) 
		sw       x17 , 116 (x30) 
		sw       x8 , 120 (x11) 
		sw       x14 , 124 (x13) 
		sw       x7 , 128 (x6) 
		sw       x26 , 132 (x24) 
		lw       x3 , 132 (x24) 
		lw       x28 , 128 (x6) 
		lw       x18 , 124 (x13) 
		lw       x16 , 120 (x11) 
		lw       x2 , 116 (x30) 
		lw       x5 , 112 (x9) 
		lw       x25 , 108 (x22) 
		lw       x19 , 104 (x10) 
		bne      x19 , x21 , Fail
		bne      x25 , x12 , Fail
		bne      x5 , x29 , Fail
		bne      x2 , x17 , Fail
		bne      x16 , x8 , Fail
		bne      x18 , x14 , Fail
		bne      x28 , x7 , Fail
		bne      x3 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
