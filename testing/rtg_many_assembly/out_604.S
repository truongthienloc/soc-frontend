.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x17 , 1
		lui      x12 , 9
		lui      x20 , 0
		lui      x7 , 5
		lui      x26 , 9
		lui      x11 , 2
		lui      x27 , 3
		lui      x22 , 9
		sw       x18 , 112 (x17) 
		sw       x16 , 116 (x12) 
		sw       x6 , 120 (x20) 
		sw       x15 , 124 (x7) 
		sw       x23 , 128 (x26) 
		sw       x19 , 132 (x11) 
		sw       x13 , 136 (x27) 
		sw       x25 , 140 (x22) 
		lw       x28 , 140 (x22) 
		lw       x8 , 136 (x27) 
		lw       x14 , 132 (x11) 
		lw       x29 , 128 (x26) 
		lw       x10 , 124 (x7) 
		lw       x21 , 120 (x20) 
		lw       x3 , 116 (x12) 
		lw       x24 , 112 (x17) 
		bne      x24 , x18 , Fail
		bne      x3 , x16 , Fail
		bne      x21 , x6 , Fail
		bne      x10 , x15 , Fail
		bne      x29 , x23 , Fail
		bne      x14 , x19 , Fail
		bne      x8 , x13 , Fail
		bne      x28 , x25 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
