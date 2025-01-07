.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x30 , x0 , x0 
		add     x9 , x0 , x0 
		addi    x15 , x0 , 4 
InArr:
		addi    x6 , x0 , 52 
		addi    x8 , x0 , 76 
		addi    x27 , x0 , 16 
		addi    x10 , x0 , 40 
		sb      x6 , 60 (x15) 
		sb      x8 , 64 (x15) 
		sb      x27 , 68 (x15) 
		sb      x10 , 72 (x15) 
Loop:
		slli    x20 , x9 , 2 
		add     x25 , x20 , x15 
		lb      x5 , 60 (x25) 
		add     x30 , x30 , x5 
		addi    x9 , x9 , 1 
		beq     x9 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x22 , x0 , 184 
		bne     x22 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
