.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x26 , x0 , 4 
		add     x6 , x0 , x0 
		add     x25 , x0 , x0 
		addi    x3 , x0 , 76 
InArr:
		addi    x10 , x0 , 36 
		addi    x24 , x0 , 52 
		addi    x19 , x0 , 52 
		addi    x17 , x0 , 60 
		sb      x10 , 76 (x3) 
		sb      x24 , 80 (x3) 
		sb      x19 , 84 (x3) 
		sb      x17 , 88 (x3) 
Loop:
		slli    x27 , x25 , 2 
		add     x18 , x27 , x3 
		lb      x12 , 76 (x18) 
		add     x6 , x6 , x12 
		addi    x25 , x25 , 1 
		beq     x25 , x26 , Result 
		jal     x0 , Loop 
Result:
		addi    x20 , x0 , 200 
		bne     x20 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
