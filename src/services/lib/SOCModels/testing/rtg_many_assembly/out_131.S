.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x10 , 8
		lui      x30 , 0
		lui      x5 , 5
		lui      x11 , 9
		lui      x4 , 1
		lui      x14 , 5
		lui      x18 , 9
		lui      x22 , 6
		sw       x28 , 60 (x10) 
		sw       x3 , 64 (x30) 
		sw       x21 , 68 (x5) 
		sw       x20 , 72 (x11) 
		sw       x29 , 76 (x4) 
		sw       x9 , 80 (x14) 
		sw       x24 , 84 (x18) 
		sw       x13 , 88 (x22) 
		lw       x16 , 88 (x22) 
		lw       x7 , 84 (x18) 
		lw       x23 , 80 (x14) 
		lw       x8 , 76 (x4) 
		lw       x2 , 72 (x11) 
		lw       x17 , 68 (x5) 
		lw       x31 , 64 (x30) 
		lw       x15 , 60 (x10) 
		bne      x15 , x28 , Fail
		bne      x31 , x3 , Fail
		bne      x17 , x21 , Fail
		bne      x2 , x20 , Fail
		bne      x8 , x29 , Fail
		bne      x23 , x9 , Fail
		bne      x7 , x24 , Fail
		bne      x16 , x13 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
