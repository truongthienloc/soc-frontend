.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 14 
		addi    x1 , x0 , 54 
		addi    x25 , x0 , 149 
		bltu    x12 , x1 , Less_i 
		bgeu    x12 , x1 , Bigger_i 
Less_i:
		addi    x31 , x25 , 85 
		andi    x16 , x25 , 106 
		add     x16 , x16 , x31 
		srli    x16 , x16 , 0 
		addi    x2 , x0 , 234 
		bne     x16 , x2 , Fail 
Bigger_i:
		ori     x31 , x25 , 6 
		xori    x16 , x25 , 177 
		add     x16 , x16 , x31 
		srai    x16 , x16 , 4 
		addi    x2 , x0 , 11 
		bne     x16 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
