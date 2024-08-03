.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 102 
		addi    x16 , x0 , 101 
		sltu    x27 , x28 , x16 
		bltu    x28 , x16 , Less_i 
		bgeu    x28 , x16 , Bigger_i 
Less_i:
		ori     x25 , x28 , 64 
		sub     x1 , x16 , x28 
		srai    x1 , x1 , 3 
		and     x1 , x1 , x0 
		addi    x21 , x0 , 0 
		beq     x1 , x21 , Pass 
Bigger_i:
		ori     x25 , x28 , 48 
		sub     x1 , x16 , x28 
		srai    x1 , x1 , 3 
		and     x1 , x1 , x0 
		addi    x21 , x0 , 0 
		beq     x1 , x21 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
