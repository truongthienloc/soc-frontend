.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x16 , 0
		lui      x28 , 9
		lui      x25 , 1
		lui      x21 , 3
		lui      x13 , 7
		lui      x12 , 8
		lui      x3 , 0
		lui      x2 , 0
		sw       x27 , 112 (x16) 
		sw       x26 , 116 (x28) 
		sw       x8 , 120 (x25) 
		sw       x5 , 124 (x21) 
		sw       x23 , 128 (x13) 
		sw       x10 , 132 (x12) 
		sw       x15 , 136 (x3) 
		sw       x22 , 140 (x2) 
		lw       x7 , 140 (x2) 
		lw       x14 , 136 (x3) 
		lw       x19 , 132 (x12) 
		lw       x18 , 128 (x13) 
		lw       x20 , 124 (x21) 
		lw       x29 , 120 (x25) 
		lw       x17 , 116 (x28) 
		lw       x11 , 112 (x16) 
		bne      x11 , x27 , Fail
		bne      x17 , x26 , Fail
		bne      x29 , x8 , Fail
		bne      x20 , x5 , Fail
		bne      x18 , x23 , Fail
		bne      x19 , x10 , Fail
		bne      x14 , x15 , Fail
		bne      x7 , x22 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
