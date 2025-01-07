.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 45 
		addi    x20 , x0 , 101 
		addi    x18 , x0 , 128 
		bltu    x3 , x20 , Less_i 
		bgeu    x3 , x20 , Bigger_i 
Less_i:
		addi    x8 , x18 , 46 
		andi    x21 , x18 , 28 
		add     x21 , x21 , x8 
		srli    x21 , x21 , 4 
		addi    x13 , x0 , 10 
		bne     x21 , x13 , Fail 
Bigger_i:
		ori     x8 , x18 , 130 
		xori    x21 , x18 , 61 
		add     x21 , x21 , x8 
		srai    x21 , x21 , 2 
		addi    x13 , x0 , 79 
		bne     x21 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
