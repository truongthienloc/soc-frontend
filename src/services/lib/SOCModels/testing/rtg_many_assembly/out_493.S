.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x9 , 3
		auipc    x4 , 7
		auipc    x22 , 9
		auipc    x12 , 3
		lui      x20 , 8
		lui      x6 , 3
		lui      x8 , 3
		lui      x14 , 5
		sw       x28 , 104 (x9) 
		sw       x13 , 108 (x4) 
		sw       x27 , 112 (x22) 
		sw       x19 , 116 (x12) 
		sw       x18 , 120 (x20) 
		sw       x23 , 124 (x6) 
		sw       x31 , 128 (x8) 
		sw       x24 , 132 (x14) 
		lw       x30 , 132 (x14) 
		lw       x21 , 128 (x8) 
		lw       x7 , 124 (x6) 
		lw       x17 , 120 (x20) 
		lw       x5 , 116 (x12) 
		lw       x16 , 112 (x22) 
		lw       x29 , 108 (x4) 
		lw       x2 , 104 (x9) 
		bne      x2 , x28 , Fail
		bne      x29 , x13 , Fail
		bne      x16 , x27 , Fail
		bne      x5 , x19 , Fail
		bne      x17 , x18 , Fail
		bne      x7 , x23 , Fail
		bne      x21 , x31 , Fail
		bne      x30 , x24 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
