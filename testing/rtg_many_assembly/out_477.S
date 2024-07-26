.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x17 , x0 , 4 
		add     x3 , x0 , x0 
		add     x23 , x0 , x0 
		addi    x9 , x0 , 4 
		addi    x12 , x0 , 2 
InArr:
		addi    x1 , x0 , 64 
		addi    x21 , x0 , 20 
		addi    x6 , x0 , 44 
		addi    x27 , x0 , 64 
		sh      x1 , 40 (x9) 
		sh      x21 , 44 (x9) 
		sh      x6 , 48 (x9) 
		sh      x27 , 52 (x9) 
Loop:
		sll     x29 , x23 , x12 
		add     x13 , x29 , x9 
		lhu     x25 , 40 (x13) 
		add     x3 , x3 , x25 
		addi    x23 , x23 , 1 
		beq     x23 , x17 , Result 
		jal     x0 , Loop 
Result:
		addi    x30 , x0 , 192 
		bne     x30 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
