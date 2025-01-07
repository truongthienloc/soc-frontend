.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , 136 
		addi    x14 , x0 , 128 
		addi    x21 , x0 , 60 
		bltu    x7 , x14 , Less_i 
		bgeu    x7 , x14 , Bigger_i 
Less_i:
		addi    x16 , x21 , 125 
		andi    x2 , x21 , 8 
		add     x2 , x2 , x16 
		srli    x2 , x2 , 4 
		addi    x9 , x0 , 12 
		bne     x2 , x9 , Fail 
Bigger_i:
		ori     x16 , x21 , 44 
		xori    x2 , x21 , 187 
		add     x2 , x2 , x16 
		srai    x2 , x2 , 4 
		addi    x9 , x0 , 12 
		bne     x2 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
