.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x27 , x0 , 4 
		addi    x3 , x0 , 0 
		addi    x14 , x0 , 0 
		addi    x21 , x0 , 20 
InArr:
		addi    x25 , x0 , 56 
		addi    x26 , x0 , 44 
		addi    x17 , x0 , 72 
		addi    x22 , x0 , 52 
		sh      x25 , 40 (x21) 
		sh      x26 , 44 (x21) 
		sh      x17 , 48 (x21) 
		sh      x22 , 52 (x21) 
Loop:
		slli    x9 , x14 , 2 
		add     x15 , x9 , x21 
		lh      x10 , 40 (x15) 
		add     x3 , x3 , x10 
		addi    x14 , x14 , 1 
		beq     x14 , x27 , Result 
		jal     x0 , Loop 
Result:
		addi    x30 , x0 , 224 
		bne     x30 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
