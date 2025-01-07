.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 119 
		addi    x21 , x0 , 17 
		addi    x18 , x0 , 81 
		bltu    x26 , x21 , Less_i 
		bgeu    x26 , x21 , Bigger_i 
Less_i:
		addi    x9 , x18 , 91 
		andi    x27 , x18 , 3 
		add     x27 , x27 , x9 
		srli    x27 , x27 , 1 
		addi    x31 , x0 , 86 
		bne     x27 , x31 , Fail 
Bigger_i:
		ori     x9 , x18 , 70 
		xori    x27 , x18 , 42 
		add     x27 , x27 , x9 
		srai    x27 , x27 , 0 
		addi    x31 , x0 , 210 
		bne     x27 , x31 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
