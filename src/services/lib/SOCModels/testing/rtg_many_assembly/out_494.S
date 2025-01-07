.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		add     x7 , x0 , x0 
		add     x28 , x0 , x0 
		addi    x2 , x0 , 48 
		addi    x14 , x0 , 2 
InArr:
		addi    x15 , x0 , 48 
		addi    x21 , x0 , 36 
		addi    x22 , x0 , 48 
		addi    x18 , x0 , 68 
		sb      x15 , 36 (x2) 
		sb      x21 , 40 (x2) 
		sb      x22 , 44 (x2) 
		sb      x18 , 48 (x2) 
Loop:
		sll     x31 , x28 , x14 
		add     x4 , x31 , x2 
		lbu     x9 , 36 (x4) 
		add     x7 , x7 , x9 
		addi    x28 , x28 , 1 
		beq     x28 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x16 , x0 , 200 
		bne     x16 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
