.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x26 , x0 , 4 
		add     x24 , x0 , x0 
		add     x16 , x0 , x0 
		addi    x8 , x0 , 20 
		addi    x10 , x0 , 2 
InArr:
		addi    x4 , x0 , 56 
		addi    x13 , x0 , 76 
		addi    x12 , x0 , 4 
		addi    x11 , x0 , 20 
		sb      x4 , 4 (x8) 
		sb      x13 , 8 (x8) 
		sb      x12 , 12 (x8) 
		sb      x11 , 16 (x8) 
Loop:
		sll     x5 , x16 , x10 
		add     x30 , x5 , x8 
		lbu     x29 , 4 (x30) 
		add     x24 , x24 , x29 
		addi    x16 , x16 , 1 
		beq     x16 , x26 , Result 
		jal     x0 , Loop 
Result:
		addi    x14 , x0 , 156 
		bne     x14 , x24 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
