.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 104 
		addi    x30 , x0 , 1 
		addi    x27 , x0 , 103 
		bltu    x28 , x30 , Less_i 
		bgeu    x28 , x30 , Bigger_i 
Less_i:
		addi    x26 , x27 , 188 
		andi    x23 , x27 , 23 
		add     x23 , x23 , x26 
		srli    x23 , x23 , 4 
		addi    x29 , x0 , 18 
		bne     x23 , x29 , Fail 
Bigger_i:
		ori     x26 , x27 , 56 
		xori    x23 , x27 , 16 
		add     x23 , x23 , x26 
		srai    x23 , x23 , 2 
		addi    x29 , x0 , 61 
		bne     x23 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
