.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x26 , x0 , x0 
		add     x27 , x0 , x0 
		addi    x22 , x0 , 16 
		addi    x25 , x0 , 2 
InArr:
		addi    x30 , x0 , 24 
		addi    x2 , x0 , 8 
		addi    x3 , x0 , 8 
		addi    x9 , x0 , 36 
		sh      x30 , 8 (x22) 
		sh      x2 , 12 (x22) 
		sh      x3 , 16 (x22) 
		sh      x9 , 20 (x22) 
Loop:
		sll     x12 , x27 , x25 
		add     x28 , x12 , x22 
		lhu     x10 , 8 (x28) 
		add     x26 , x26 , x10 
		addi    x27 , x27 , 1 
		beq     x27 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x21 , x0 , 76 
		bne     x21 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
