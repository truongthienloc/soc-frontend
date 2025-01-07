.text

#The program finds the value of fibonacci 

Fibo:
		addi    x22 , x0 , 17 
		addi    x26 , x0 , 1 
		addi    x5 , x0 , 1 
		addi    x29 , x0 , 3 
		beq     x22 , x0 , Result0 
		beq     x22 , x5 , Result1 
Loop: 
		blt     x22 , x29 , Result 
		add     x20 , x26 , x5 
		addi    x26 , x5 , 0 
		addi    x5 , x20 , 0 
		addi    x29 , x29 , 1 
		jal     x0 , Loop 
Result0:
		addi    x20 , x0 , 0 
		addi    x28 , x0 , 0 
		bne     x20 , x28 , Fail 
Result1:
		addi    x20 , x0 , 1 
		addi    x14 , x0 , 1 
		bne     x20 , x14 , Fail 
Result:
		addi    x19 , x0 , 1597 
		bne     x20 , x19 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
