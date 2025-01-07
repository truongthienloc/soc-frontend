.text

#The program checks the ALU instruction in I_type

Main:
		addi    x13 , x0 , 83 
		addi    x16 , x0 , 172 
		addi    x29 , x0 , 192 
		bltu    x13 , x16 , Less_i 
		bgeu    x13 , x16 , Bigger_i 
Less_i:
		addi    x21 , x29 , 124 
		andi    x2 , x29 , 169 
		add     x2 , x2 , x21 
		srli    x2 , x2 , 4 
		addi    x17 , x0 , 27 
		bne     x2 , x17 , Fail 
Bigger_i:
		ori     x21 , x29 , 22 
		xori    x2 , x29 , 31 
		add     x2 , x2 , x21 
		srai    x2 , x2 , 4 
		addi    x17 , x0 , 27 
		bne     x2 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
