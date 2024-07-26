.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x5 , 6
		auipc    x25 , 8
		auipc    x9 , 5
		auipc    x15 , 9
		lui      x29 , 6
		lui      x1 , 9
		lui      x31 , 0
		lui      x2 , 9
		sw       x18 , 92 (x5) 
		sw       x26 , 96 (x25) 
		sw       x23 , 100 (x9) 
		sw       x22 , 104 (x15) 
		sw       x14 , 108 (x29) 
		sw       x8 , 112 (x1) 
		sw       x20 , 116 (x31) 
		sw       x6 , 120 (x2) 
		lw       x17 , 120 (x2) 
		lw       x16 , 116 (x31) 
		lw       x3 , 112 (x1) 
		lw       x4 , 108 (x29) 
		lw       x12 , 104 (x15) 
		lw       x21 , 100 (x9) 
		lw       x11 , 96 (x25) 
		lw       x13 , 92 (x5) 
		bne      x13 , x18 , Fail
		bne      x11 , x26 , Fail
		bne      x21 , x23 , Fail
		bne      x12 , x22 , Fail
		bne      x4 , x14 , Fail
		bne      x3 , x8 , Fail
		bne      x16 , x20 , Fail
		bne      x17 , x6 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
