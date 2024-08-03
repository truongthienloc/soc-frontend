.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x29 , 6
		lui      x8 , 0
		lui      x15 , 4
		lui      x27 , 1
		lui      x31 , 1
		lui      x30 , 8
		lui      x24 , 5
		lui      x28 , 7
		sw       x19 , 72 (x29) 
		sw       x5 , 76 (x8) 
		sw       x11 , 80 (x15) 
		sw       x6 , 84 (x27) 
		sw       x18 , 88 (x31) 
		sw       x10 , 92 (x30) 
		sw       x17 , 96 (x24) 
		sw       x9 , 100 (x28) 
		lw       x26 , 100 (x28) 
		lw       x20 , 96 (x24) 
		lw       x25 , 92 (x30) 
		lw       x7 , 88 (x31) 
		lw       x3 , 84 (x27) 
		lw       x16 , 80 (x15) 
		lw       x14 , 76 (x8) 
		lw       x12 , 72 (x29) 
		bne      x12 , x19 , Fail
		bne      x14 , x5 , Fail
		bne      x16 , x11 , Fail
		bne      x3 , x6 , Fail
		bne      x7 , x18 , Fail
		bne      x25 , x10 , Fail
		bne      x20 , x17 , Fail
		bne      x26 , x9 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
