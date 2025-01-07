.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		add     x5 , x0 , x0 
		add     x30 , x0 , x0 
		addi    x28 , x0 , 40 
InArr:
		addi    x20 , x0 , 16 
		addi    x6 , x0 , 12 
		addi    x1 , x0 , 32 
		addi    x4 , x0 , 44 
		sb      x20 , 8 (x28) 
		sb      x6 , 12 (x28) 
		sb      x1 , 16 (x28) 
		sb      x4 , 20 (x28) 
Loop:
		slli    x2 , x30 , 2 
		add     x9 , x2 , x28 
		lb      x13 , 8 (x9) 
		add     x5 , x5 , x13 
		addi    x30 , x30 , 1 
		beq     x30 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x21 , x0 , 104 
		bne     x21 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
